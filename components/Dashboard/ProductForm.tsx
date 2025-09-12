"use client";

import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter, useParams } from "next/navigation";
import Image from "next/image";
import { Plus, X, Utensils, ChefHat, Clock, Info } from "lucide-react";

import { ProductFormData, productFormSchema } from "@/lib/validation/product";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { foodCategories } from "@/lib/data/food-categories";
import { dietaryOptions, DietaryOptionValue } from "@/lib/data/dietary-info";

export default function NewProductPage() {
  const router = useRouter();
  const params = useParams();
  const businessId = params?.slug as string | undefined;

  const [previews, setPreviews] = useState<{ url: string; name: string }[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [ingredientInput, setIngredientInput] = useState("");
  const [duplicateProduct, setDuplicateProduct] = useState<{
    id: string;
    name: string;
    image?: string;
    price?: number;
  } | null>(null);

  const [availableSubcategories, setAvailableSubcategories] = useState<
    { id: string; label: string }[]
  >([]);

  const form = useForm<ProductFormData>({
    resolver: zodResolver(productFormSchema),
    defaultValues: {
      name: "",
      price: 0,
      description: "",
      category: "",
      subcategory: "",
      isAvailable: true,
      images: [],
      ingredients: [],
      dietaryInfo: [],
      preparationTime: 0,
    },
  });

  // Watch category changes to update subcategories
  const selectedCategory = form.watch("category");

  useEffect(() => {
    if (selectedCategory) {
      const category = foodCategories.find(
        (cat) => cat.id === selectedCategory
      );
      setAvailableSubcategories(
        category?.subcategories
          ? category.subcategories.map((sub) => ({ ...sub }))
          : []
      );
      form.setValue("subcategory", "");
    } else {
      setAvailableSubcategories([]);
    }
  }, [selectedCategory, form]);

  // Cleanup preview URLs
  useEffect(() => {
    return () => {
      previews.forEach((preview) => {
        try {
          URL.revokeObjectURL(preview.url);
        } catch (e) {
          console.debug("Failed to revoke URL during cleanup:", e);
        }
      });
    };
  }, [previews]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError(null);
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    const currentFiles = form.getValues("images") || [];
    if (currentFiles.length + files.length > 5) {
      setError("You can upload a maximum of 5 images.");
      return;
    }

    const newPreviews = files.map((file) => ({
      url: URL.createObjectURL(file),
      name: file.name,
    }));

    setPreviews((prev) => [...prev, ...newPreviews]);
    form.setValue("images", [...currentFiles, ...files], {
      shouldValidate: true,
    });
    e.currentTarget.value = "";
  };

  const removeImage = (index: number) => {
    setPreviews((prev) => {
      const previewToRemove = prev[index];
      if (previewToRemove) {
        try {
          URL.revokeObjectURL(previewToRemove.url);
        } catch (e) {
          console.debug("Failed to revoke URL:", e);
        }
      }
      return prev.filter((_, i) => i !== index);
    });

    const currentFiles = form.getValues("images") || [];
    form.setValue(
      "images",
      currentFiles.filter((_, i) => i !== index),
      { shouldValidate: true }
    );
  };

  const addIngredient = () => {
    const value = ingredientInput.trim();
    if (!value) return;
    const current = form.getValues("ingredients") || [];
    if (current.some((c) => c.toLowerCase() === value.toLowerCase())) {
      setError("This ingredient is already added");
      return;
    }
    form.setValue("ingredients", [...current, value], { shouldValidate: true });
    setIngredientInput("");
    setError(null);
  };

  const removeIngredient = (index: number) => {
    const current = form.getValues("ingredients") || [];
    form.setValue(
      "ingredients",
      current.filter((_, i) => i !== index),
      { shouldValidate: true }
    );
  };

  const toggleDietaryInfo = (info: DietaryOptionValue) => {
    const current = form.getValues("dietaryInfo") || [];
    if (current.includes(info)) {
      form.setValue(
        "dietaryInfo",
        current.filter((i) => i !== info),
        { shouldValidate: true }
      );
    } else {
      form.setValue("dietaryInfo", [...current, info], {
        shouldValidate: true,
      });
    }
  };

  const onSubmit = async (data: ProductFormData) => {
    setLoading(true);
    setError(null);
    setDuplicateProduct(null);

    try {
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("description", data.description || "");
      formData.append("price", data.price.toString());
      formData.append("category", data.category);
      formData.append("subcategory", data.subcategory);
      formData.append("isAvailable", data.isAvailable.toString());
      formData.append(
        "preparationTime",
        data.preparationTime?.toString() || "0"
      );

      if (data.ingredients?.length) {
        formData.append("ingredients", JSON.stringify(data.ingredients));
      }
      if (data.dietaryInfo?.length) {
        formData.append("dietaryInfo", JSON.stringify(data.dietaryInfo));
      }

      // Validate and append images
      const maxFileSize = 5 * 1024 * 1024;
      const validTypes = ["image/jpeg", "image/png", "image/webp", "image/jpg"];
      if (data.images?.length) {
        data.images.forEach((file) => {
          if (file instanceof File) {
            if (!validTypes.includes(file.type))
              throw new Error(`Invalid file type: ${file.name}`);
            if (file.size > maxFileSize)
              throw new Error(`File too large: ${file.name}`);
            formData.append("images", file);
          }
        });
      }

      const response = await fetch(`/api/product/${businessId}/add-product`, {
        method: "POST",
        body: formData,
      });

      const responseData = await response.json();

      // Handle duplicate product
      if (response.status === 409 && responseData.duplicate) {
        setDuplicateProduct(responseData.existingProduct);
        return;
      }

      if (!response.ok) {
        if (responseData.fieldErrors) {
          Object.entries(responseData.fieldErrors).forEach(
            ([field, message]) => {
              form.setError(field as keyof ProductFormData, {
                type: "server",
                message: Array.isArray(message) ? message[0] : String(message),
              });
            }
          );
          throw new Error("Validation errors occurred");
        }
        throw new Error(responseData.error || "Failed to create product");
      }

      router.push(`/dashboard/${businessId}/products`);
    } catch (err) {
      console.error("Submission error:", err);
      setError(
        err instanceof Error
          ? err.message
          : "An error occurred while creating the product"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-6 space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <ChefHat className="w-6 h-6" /> Add New Product
        </h1>
        <Button
          variant="outline"
          onClick={() => router.back()}
          disabled={loading}
        >
          Cancel
        </Button>
      </div>

      {error && (
        <div className="bg-destructive/15 text-destructive p-3 rounded-md text-sm">
          {error}
        </div>
      )}

      {/* //this for dublicates message */}
      {duplicateProduct && (
        <Card className="border-destructive bg-destructive/10">
          <CardHeader className="pb-2">
            <CardTitle className="text-destructive flex items-center gap-2">
              <X className="w-5 h-5" />
              Duplicate Product Detected
            </CardTitle>
            <CardDescription>
              A product with this name already exists in this category.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col sm:flex-row gap-4 items-center">
            {/* Product Image */}
            <div className="relative w-32 h-32 rounded-md overflow-hidden border">
              <Image
                src={duplicateProduct.image || "/placeholder.png"}
                alt={duplicateProduct.name}
                fill
                className="object-cover"
              />
            </div>

            {/* Product Details */}
            <div className="flex-1 space-y-2">
              <p className="text-lg font-semibold">{duplicateProduct.name}</p>
              {duplicateProduct.price && (
                <p className="text-sm text-muted-foreground">
                  Price: Ksh {duplicateProduct.price}
                </p>
              )}
            </div>

            {/* Actions */}
            <div className="flex gap-2">
              <Button
                variant="outline"
                onClick={() =>
                  router.push(
                    `/dashboard/${businessId}/products/${duplicateProduct.id}/edit`
                  )
                }
              >
                Edit Existing
              </Button>
              <Button
                variant="destructive"
                onClick={() => {
                  setDuplicateProduct(null); // clear and allow overwrite
                }}
              >
                Replace
              </Button>
              <Button
                variant="ghost"
                onClick={() => {
                  setDuplicateProduct(null);
                  router.back();
                }}
              >
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <fieldset disabled={loading} className="space-y-6">
          {/* Basic Information Card */}
          <Card>
            <CardHeader>
              <CardTitle>Basic Information</CardTitle>
              <CardDescription>
                Essential details about your product
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="category">Category *</Label>
                  <Controller
                    control={form.control}
                    name="category"
                    render={({ field }) => (
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <SelectTrigger
                          className={
                            form.formState.errors.category
                              ? "border-destructive"
                              : ""
                          }
                        >
                          <SelectValue placeholder="Select a category" />
                        </SelectTrigger>
                        <SelectContent>
                          {foodCategories.map((category) => (
                            <SelectItem key={category.id} value={category.id}>
                              {category.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    )}
                  />
                  {form.formState.errors.category && (
                    <p className="text-sm text-destructive">
                      {form.formState.errors.category.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="subcategory">Subcategory *</Label>
                  <Controller
                    control={form.control}
                    name="subcategory"
                    render={({ field }) => (
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                        disabled={!selectedCategory}
                      >
                        <SelectTrigger
                          className={
                            form.formState.errors.subcategory
                              ? "border-destructive"
                              : ""
                          }
                        >
                          <SelectValue
                            placeholder={
                              selectedCategory
                                ? "Select subcategory"
                                : "Select category first"
                            }
                          />
                        </SelectTrigger>
                        <SelectContent>
                          {availableSubcategories.length === 0 ? (
                            <div className="px-2 py-1.5 text-sm text-muted-foreground">
                              Select a category first
                            </div>
                          ) : (
                            availableSubcategories.map((subcategory) => (
                              <SelectItem
                                key={subcategory.id}
                                value={subcategory.id}
                              >
                                {subcategory.label}
                              </SelectItem>
                            ))
                          )}
                        </SelectContent>
                      </Select>
                    )}
                  />
                  {form.formState.errors.subcategory && (
                    <p className="text-sm text-destructive">
                      {form.formState.errors.subcategory.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="name">Product Name *</Label>
                <Input
                  id="name"
                  {...form.register("name")}
                  placeholder="e.g., Chicken Biryani"
                  className={
                    form.formState.errors.name ? "border-destructive" : ""
                  }
                />
                {form.formState.errors.name && (
                  <p className="text-sm text-destructive">
                    {form.formState.errors.name.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  {...form.register("description")}
                  rows={3}
                  placeholder="Describe your product (taste, ingredients, serving suggestions)..."
                />
                <p className="text-sm text-muted-foreground">
                  {form.watch("description")?.length || 0}/500 characters
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="price">Price (Ksh) *</Label>
                  <Input
                    id="price"
                    type="number"
                    step="0.01"
                    min="0"
                    {...form.register("price", { valueAsNumber: true })}
                    placeholder="0.00"
                    className={
                      form.formState.errors.price ? "border-destructive" : ""
                    }
                  />
                  {form.formState.errors.price && (
                    <p className="text-sm text-destructive">
                      {form.formState.errors.price.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="preparationTime">
                    Preparation Time (minutes)
                  </Label>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-muted-foreground" />
                    <Input
                      id="preparationTime"
                      type="number"
                      min="0"
                      max="240"
                      {...form.register("preparationTime", {
                        valueAsNumber: true,
                      })}
                      placeholder="e.g., 30"
                    />
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                <div className="space-y-0.5">
                  <Label htmlFor="isAvailable" className="text-base">
                    Available for order
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    Toggle to make this product available or unavailable
                  </p>
                </div>
                <Controller
                  control={form.control}
                  name="isAvailable"
                  render={({ field }) => (
                    <Switch
                      id="isAvailable"
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  )}
                />
              </div>
            </CardContent>
          </Card>

          {/* Images Card */}
          <Card>
            <CardHeader>
              <CardTitle>Product Images</CardTitle>
              <CardDescription>
                Upload high-quality images of your product (max 5)
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="images">Upload Images</Label>
                <div className="flex items-center gap-2">
                  <Input
                    id="images"
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleImageChange}
                    className="flex-1"
                  />
                </div>
                <p className="text-sm text-muted-foreground">
                  {previews.length}/5 images uploaded • Recommended: 800x600px
                  or larger
                </p>
              </div>

              {previews.length > 0 && (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {previews.map((preview, index) => (
                    <div
                      key={preview.url}
                      className="relative group border rounded-lg overflow-hidden"
                    >
                      <div className="aspect-square relative w-full">
                        <Image
                          src={preview.url}
                          alt={`Preview ${index + 1}`}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="p-2 bg-background/80">
                        <p className="text-xs font-medium truncate">
                          {preview.name}
                        </p>
                      </div>
                      <Button
                        type="button"
                        variant="destructive"
                        size="icon"
                        className="absolute top-2 right-2 opacity-80 group-hover:opacity-100 transition-opacity"
                        onClick={() => removeImage(index)}
                      >
                        <X className="w-3 h-3" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Ingredients Card */}
          <Card>
            <CardHeader>
              <CardTitle>Ingredients</CardTitle>
              <CardDescription>
                List the main ingredients (separate with commas or add one by
                one)
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-2">
                <Input
                  value={ingredientInput}
                  onChange={(e) => setIngredientInput(e.target.value)}
                  placeholder="Add an ingredient (e.g., chicken, rice, spices)..."
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      addIngredient();
                    }
                  }}
                />
                <Button
                  type="button"
                  onClick={addIngredient}
                  className="shrink-0"
                >
                  <Plus className="w-4 h-4" />
                </Button>
              </div>

              {(form.watch("ingredients") ?? []).length > 0 && (
                <div className="flex flex-wrap gap-2 p-3 bg-muted/30 rounded-lg">
                  {form.watch("ingredients")?.map((ingredient, index) => (
                    <Badge
                      key={index}
                      variant="secondary"
                      className="flex items-center gap-1 py-1"
                    >
                      {ingredient}
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="h-3 w-3 p-0 hover:bg-transparent"
                        onClick={() => removeIngredient(index)}
                      >
                        <X className="w-2.5 h-2.5" />
                      </Button>
                    </Badge>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Dietary Information Card */}
          <Card>
            <CardHeader>
              <CardTitle>Dietary Information</CardTitle>
              <CardDescription>
                Select applicable dietary tags to help customers find your
                product
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                <TooltipProvider>
                  {dietaryOptions.map((option) => {
                    const isSelected = form
                      .getValues("dietaryInfo")
                      ?.includes(option.value);
                    return (
                      <Tooltip key={option.value} delayDuration={100}>
                        <TooltipTrigger asChild>
                          <Button
                            type="button"
                            variant={isSelected ? "default" : "outline"}
                            className="h-auto py-3 px-4 flex flex-col items-start gap-1 text-left normal-case font-normal"
                            onClick={() => toggleDietaryInfo(option.value)}
                          >
                            <div className="flex items-center gap-2 w-full">
                              {isSelected && (
                                <div className="w-2 h-2 bg-primary-foreground rounded-full" />
                              )}
                              <span className="font-medium flex-1">
                                {option.label}
                              </span>
                              <Info className="w-3 h-3 text-muted-foreground" />
                            </div>
                            <span className="text-xs text-muted-foreground mt-1 block">
                              {option.description}
                            </span>
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent side="top" className="max-w-xs">
                          <p>{option.description}</p>
                        </TooltipContent>
                      </Tooltip>
                    );
                  })}
                </TooltipProvider>
              </div>
            </CardContent>
          </Card>

          {/* Submit Buttons */}
          <div className="flex justify-end gap-4 pt-4 border-t">
            <Button
              type="button"
              variant="outline"
              onClick={() => router.back()}
              disabled={loading}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={loading} className="min-w-32">
              {loading ? (
                <>
                  <div className="animate-spin mr-2 h-4 w-4 border-2 border-background border-t-transparent rounded-full" />
                  Creating...
                </>
              ) : (
                <>
                  Create Product
                  <Utensils className="w-4 h-4 ml-2" />
                </>
              )}
            </Button>
          </div>
        </fieldset>
      </form>
    </div>
  );
}
