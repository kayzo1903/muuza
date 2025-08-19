"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { Heart , ChevronLeft, ChevronRight, ShoppingCart, Star, Loader2, MessageSquare } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Image from "next/image";
import Link from "next/link";


type Comment = {
  id: number;
  user: { name: string; avatar: string };
  text: string;
  likes: number;
  rating?: number;
  date: string;
};

type Chef = {
  id: number;
  name: string;
  avatar: string;
  online: boolean;
};

type Dish = {
  id: number;
  name: string;
  category: string;
  description: string;
  price: number;
  rating: number;
  images: string[];
  likes: number;
  comments: Comment[];
  dietaryTags?: string[];
  chef: Chef;
};

const dishes: Dish[] = [
  {
    id: 1,
    name: "Ugali",
    category: "East African",
    description: "A traditional Tanzanian staple made from maize flour, usually served with sukuma wiki or nyama choma.",
    price: 3.5,
    rating: 4.6,
    images: ["/foods/ugali.jpg", "/foods/mandazi.jpg"],
    likes: 240,
    dietaryTags: ["Vegetarian", "Gluten Free"],
    chef: {
      id: 1,
      name: "Chef Amina",
      avatar: "/avatar/default.jpg",
      online: true
    },
    comments: [
      {
        id: 1,
        user: { name: "Amina Hassan", avatar: "/avatar/default.jpg" },
        text: "Classic Tanzanian staple, love it with sukuma wiki 🍃",
        likes: 12,
        rating: 5,
        date: "2023-05-15"
      },
      {
        id: 2,
        user: { name: "John Doe", avatar: "/avatar/default.jpg" },
        text: "Ugali reminds me of home 😍",
        likes: 5,
        rating: 4,
        date: "2023-04-22"
      },
    ],
  },
  {
    id: 2,
    name: "Pilau",
    category: "East African",
    description: "Spiced rice cooked with beef, chicken, or goat. A festive dish perfect for Eid and celebrations.",
    price: 5.0,
    rating: 4.8,
    images: ["/foods/pilau.jpg", "/foods/biryani.jpg", "/foods/samaki.jpg"],
    likes: 320,
    dietaryTags: ["Spicy"],
    chef: {
      id: 2,
      name: "Chef Kamau",
      avatar: "/avatars/kamau.jpg",
      online: false
    },
    comments: [
      {
        id: 1,
        user: { name: "Fatma Ali", avatar: "/avatars/fatma.jpg" },
        text: "Perfect for Eid celebrations ✨",
        likes: 20,
        rating: 5,
        date: "2023-06-10"
      },
    ],
  },
];

export default function DishShowPage({ params }: { params: { id: string } }) {
  const dish = dishes.find((d) => d.id === Number(params.id));
  const [likes, setLikes] = useState(dish?.likes || 0);
  const [isLiked, setIsLiked] = useState(false);
  const [comments, setComments] = useState<Comment[]>(dish?.comments || []);
  const [newComment, setNewComment] = useState("");
  const [newCommentRating, setNewCommentRating] = useState<number | null>(null);
  const [currentImage, setCurrentImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [cartItems, setCartItems] = useState<{id: number, quantity: number}[]>([]);

  if (!dish) return (
    <div className="flex flex-col items-center justify-center h-64">
      <Loader2 className="w-8 h-8 animate-spin" />
      <p className="mt-2">Dish not found</p>
    </div>
  );

  const handleLikeDish = () => {
    setLikes(prev => isLiked ? prev - 1 : prev + 1);
    setIsLiked(!isLiked);
  };

  const handleLikeComment = (id: number) => {
    setComments(prev =>
      prev.map((c) => (c.id === id ? { ...c, likes: c.likes + 1 } : c)))
  };

  const handleComment = () => {
    if (newComment.trim() !== "") {
      const newC: Comment = {
        id: comments.length + 1,
        user: { name: "Guest User", avatar: "/avatars/default.jpg" },
        text: newComment,
        likes: 0,
        rating: newCommentRating || 0,
        date: new Date().toISOString().split('T')[0]
      };
      setComments((prev) => [...prev, newC]);
      setNewComment("");
      setNewCommentRating(null);
    }
  };

  const handleAddToCart = () => {
    setCartItems(prev => {
      const existingItem = prev.find(item => item.id === dish.id);
      if (existingItem) {
        return prev.map(item => 
          item.id === dish.id 
            ? {...item, quantity: item.quantity + quantity} 
            : item
        );
      }
      return [...prev, {id: dish.id, quantity}];
    });
    setQuantity(1);
  };

  const handleOrderNow = () => {
    handleAddToCart();
    // In a real app, this would navigate to checkout
    window.location.href = "/checkout";
  };

  const nextImage = () =>
    setCurrentImage((prev) => (prev + 1) % dish.images.length);

  const prevImage = () =>
    setCurrentImage((prev) =>
      prev === 0 ? dish.images.length - 1 : prev - 1
    );

  return (
    <div className="p-4 max-w-4xl mx-auto">
      {/* Chef Info Bar */}
      <Card className="mb-6 p-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Avatar>
              <AvatarImage src={dish.chef.avatar} alt={dish.chef.name} />
              <AvatarFallback>{dish.chef.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <p className="font-medium">{dish.chef.name}</p>
              <p className="text-sm text-muted-foreground flex items-center gap-1">
                <span className={`inline-block w-2 h-2 rounded-full ${
                  dish.chef.online ? 'bg-green-500' : 'bg-gray-400'
                }`}></span>
                {dish.chef.online ? 'Online' : 'Offline'}
              </p>
            </div>
          </div>
          <Link 
            href={`/chat/${dish.chef.id}`}
            className="flex items-center gap-2 text-sm bg-primary text-primary-foreground px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors"
          >
            <MessageSquare className="w-4 h-4" />
            Chat with Chef
          </Link>
        </div>
      </Card>

      {/* Dish Card with carousel */}
      <div className="flex flex-col lg:flex-row gap-6 mb-8">
        <div className="lg:w-1/2">
          <Card className="relative rounded-2xl overflow-hidden shadow-md aspect-square">
            <Image
              src={dish.images[currentImage]}
              alt={dish.name}
              fill
              className="object-cover"
              onError={(e) => {
                (e.target as HTMLImageElement).src = '/foods/default.jpg';
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

            {/* Carousel controls */}
            {dish.images.length > 1 && (
              <>
                <button
                  aria-label="Previous image"
                  onClick={prevImage}
                  className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/40 rounded-full p-2 text-white hover:bg-black/60 transition"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  aria-label="Next image"
                  onClick={nextImage}
                  className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/40 rounded-full p-2 text-white hover:bg-black/60 transition"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1">
                  {dish.images.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImage(index)}
                      className={`w-2 h-2 rounded-full transition-all ${
                        index === currentImage ? 'bg-white w-4' : 'bg-white/50'
                      }`}
                    />
                  ))}
                </div>
              </>
            )}
          </Card>
        </div>

        <div className="lg:w-1/2 space-y-4">
          <h1 className="text-2xl font-bold">{dish.name}</h1>
          <div className="flex items-center gap-2">
            <Badge variant="secondary">{dish.category}</Badge>
            <div className="flex items-center gap-1 text-sm text-yellow-600">
              <Star className="w-4 h-4 fill-yellow-400" />
              <span>{dish.rating.toFixed(1)}</span>
            </div>
          </div>

          {dish.dietaryTags && (
            <div className="flex flex-wrap gap-1">
              {dish.dietaryTags.map(tag => (
                <Badge key={tag} variant="outline">{tag}</Badge>
              ))}
            </div>
          )}

          <p className="text-gray-700">{dish.description}</p>

          <div className="flex items-center gap-4">
            <span className="text-xl font-bold text-green-600">${dish.price.toFixed(2)}</span>
            
            <div className="flex items-center gap-2">
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => setQuantity(q => Math.max(1, q-1))}
                disabled={quantity <= 1}
              >
                -
              </Button>
              <span className="w-8 text-center">{quantity}</span>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => setQuantity(q => q+1)}
              >
                +
              </Button>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <Button 
              variant="outline" 
              onClick={handleLikeDish}
              className="flex items-center gap-1"
            >
              <motion.div
                whileTap={{ scale: 0.9 }}
                animate={{ color: isLiked ? '#ef4444' : '#000000' }}
              >
                <Heart className={`w-4 h-4 ${isLiked ? 'fill-red-500' : ''}`} />
              </motion.div>
              {likes} Likes
            </Button>

            <div className="flex-1 flex gap-3">
              <Button 
                variant="outline" 
                className="flex-1"
                onClick={handleAddToCart}
              >
                <ShoppingCart className="w-4 h-4 mr-2" />
                Add to Cart
              </Button>
              <Button 
                className="flex-1 bg-green-600 hover:bg-green-700"
                onClick={handleOrderNow}
              >
                Order Now
              </Button>
            </div>
          </div>

          {cartItems.some(item => item.id === dish.id) && (
            <p className="text-sm text-green-600">
              ✅ {cartItems.find(item => item.id === dish.id)?.quantity} item(s) in cart
            </p>
          )}
        </div>
      </div>

      {/* Comments Section */}
      <section aria-labelledby="reviews-heading" className="mt-8">
        <h2 id="reviews-heading" className="text-xl font-semibold mb-4">Customer Reviews</h2>

        {/* Add comment */}
        <Card className="p-4 mb-6">
          <h3 className="font-medium mb-3">Add your review</h3>
          <div className="flex items-center mb-3">
            {[1,2,3,4,5].map((star) => (
              <Star
                key={star}
                className={`w-5 h-5 cursor-pointer ${
                  star <= (newCommentRating || 0) 
                    ? 'text-yellow-400 fill-yellow-400' 
                    : 'text-gray-300'
                }`}
                onClick={() => setNewCommentRating(star)}
              />
            ))}
          </div>
          <div className="flex gap-2">
            <Input
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Share your experience..."
              className="flex-1"
            />
            <Button onClick={handleComment}>Post</Button>
          </div>
        </Card>

        {/* List of comments */}
        {comments.length === 0 ? (
          <p className="text-gray-500 text-center py-6">No reviews yet. Be the first!</p>
        ) : (
          <div className="space-y-4">
            {comments
              .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
              .map((c) => (
                <motion.div
                  key={c.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-4 border rounded-lg"
                >
                  <div className="flex items-start gap-3">
                    <Avatar>
                      <AvatarImage src={c.user.avatar} alt={c.user.name} />
                      <AvatarFallback>
                        {c.user.name.charAt(0).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>

                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <p className="font-semibold">{c.user.name}</p>
                        <div className="flex items-center gap-1 text-sm text-gray-500">
                          {c.rating && (
                            <>
                              <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                              <span>{c.rating}</span>
                            </>
                          )}
                          <span>•</span>
                          <span>{c.date}</span>
                        </div>
                      </div>
                      <p className="text-gray-700 mt-1">{c.text}</p>
                      <button
                        onClick={() => handleLikeComment(c.id)}
                        className="flex items-center gap-1 text-xs text-gray-500 mt-2 hover:text-red-500"
                      >
                        <Heart className="w-3 h-3" /> {c.likes} likes
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
          </div>
        )}
      </section>

      {/* Mobile floating action buttons */}
      <div className="fixed bottom-4 right-4 z-10 flex gap-2 sm:hidden">
        <Button
          size="icon"
          className="rounded-full shadow-lg bg-red-500 hover:bg-red-600"
          onClick={handleLikeDish}
        >
          <Heart className={`w-5 h-5 ${isLiked ? 'fill-white' : ''}`} />
        </Button>
        <Button
          size="icon"
          className="rounded-full shadow-lg bg-green-600 hover:bg-green-700"
          onClick={handleOrderNow}
        >
          <ShoppingCart className="w-5 h-5" />
        </Button>
      </div>
    </div>
  );
}