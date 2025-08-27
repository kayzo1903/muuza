"use client";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Star, MapPin, Clock, Utensils, Share2, MessageCircle, Heart, ShoppingCart, X, Bell } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Image from "next/image";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { toast } from "sonner";

export default function RestaurantShowcasePage() {
  const [cart, setCart] = useState<{name: string; price: string; quantity: number}[]>([]);
  const [showCart, setShowCart] = useState(false);
  const [showOrderModal, setShowOrderModal] = useState(false);
  const [currentOrderItem, setCurrentOrderItem] = useState<{
    name: string;
    price: string;
    quantity: number;
    specialInstructions: string;
  } | null>(null);
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);

  const restaurant = {
    name: "Swahili Bites",
    tagline: "Authentic Coastal Cuisine",
    coverImage: "/images/restaurant2.jpg",
    logo: "/images/restaurant1.jpg",
    rating: 4.8,
    reviewCount: 1243,
    location: "kunduchi, Dar es Salaam",
    openingHours: "8:00 AM - 10:00 PM",
    cuisine: ["Swahili", "Seafood", "Grilled"],
    phone: "+254 712 345 678",
    bio: "Family-owned restaurant serving authentic Swahili cuisine since 2010. Specializing in coastal flavors with fresh seafood and traditional spices."
  };

  const menuItems = [
    { 
      name: "Pilau", 
      price: "TZS 8,000", 
      image: "/foods/pilau.jpg",
      likes: 320,
      comments: 45,
      description: "Fragrant spiced rice with tender meat"
    },
    { 
      name: "Nyama Choma", 
      price: "TZS 12,000", 
      image: "/foods/nyama.jpg",
      likes: 410,
      comments: 58,
      description: "Grilled meat with secret marinade"
    },
    { 
      name: "Samaki Wa Kupaka", 
      price: "TZS 9,500", 
      image: "/foods/samaki.jpg",
      likes: 290,
      comments: 39,
      description: "Coconut fish curry with coastal spices"
    }
  ];

  const reviews = [
    { user: "Fatma", rating: 5, comment: "Best biryani in Mombasa!", date: "2 days ago" },
    { user: "James", rating: 4, comment: "Great ambiance but slow service", date: "1 week ago" }
  ];

  const addToCart = (itemName: string, itemPrice: string) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.name === itemName);
      if (existingItem) {
        return prevCart.map(item =>
          item.name === itemName ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        return [...prevCart, { name: itemName, price: itemPrice, quantity: 1 }];
      }
    });
  };

  const removeFromCart = (itemName: string) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.name === itemName);
      if (existingItem && existingItem.quantity > 1) {
        return prevCart.map(item =>
          item.name === itemName ? { ...item, quantity: item.quantity - 1 } : item
        );
      } else {
        return prevCart.filter(item => item.name !== itemName);
      }
    });
  };

  const getTotalItems = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  const getTotalPrice = () => {
    return cart.reduce((total, item) => {
      const price = parseInt(item.price.replace(/[^0-9]/g, ''));
      return total + (price * item.quantity);
    }, 0).toLocaleString('en-US');
  };

  const handleInstantOrder = (item: {name: string; price: string}) => {
    setCurrentOrderItem({
      name: item.name,
      price: item.price,
      quantity: 1,
      specialInstructions: ""
    });
    setShowOrderModal(true);
  };

  const handleOrderSubmit = () => {
    if (currentOrderItem) {
      addToCart(currentOrderItem.name, currentOrderItem.price);
      setShowOrderModal(false);
      setShowCart(true);
    }
  };

  const toggleNotifications = () => {
    setNotificationsEnabled(!notificationsEnabled);
    toast.success(
      notificationsEnabled 
        ? "Notifications disabled for this restaurant" 
        : "Notifications enabled for this restaurant"
    );
  };

  return (
    <div className="max-w-6xl mx-auto pb-16 md:pb-0">
      {/* Cover Photo */}
      <div className="relative h-64 md:h-80 w-full">
        <Image
          src={restaurant.coverImage}
          alt={`${restaurant.name} cover`}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute bottom-4 right-4">
          <Button variant="secondary" className="rounded-full">
            <Share2 className="w-4 h-4 mr-2" /> Share
          </Button>
        </div>
      </div>

      {/* Profile Header */}
      <div className="px-4 md:px-6">
        <div className="flex flex-col md:flex-row gap-6 -mt-12">
          <Avatar className="h-24 w-24 md:h-32 md:w-32 border-4 border-white dark:border-gray-900">
            <AvatarImage src={restaurant.logo} />
            <AvatarFallback>{restaurant.name.charAt(0)}</AvatarFallback>
          </Avatar>

          <div className="flex-1 space-y-2 pt-4">
            <h1 className="text-2xl font-bold">{restaurant.name}</h1>
            <p className="text-gray-600">{restaurant.tagline}</p>
            
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1 bg-primary/10 px-2 py-1 rounded-full">
                <Star className="w-4 h-4 fill-yellow-400 text-yellow-500" />
                <span>{restaurant.rating}</span>
                <span className="text-gray-500">({restaurant.reviewCount})</span>
              </div>
              
              <Button 
                size="sm" 
                variant={notificationsEnabled ? "default" : "outline"}
                onClick={toggleNotifications}
              >
                <Bell className="w-4 h-4 mr-2" />
                {notificationsEnabled ? "Subscribed" : "Notify Me"}
              </Button>
              <Button variant="outline" size="sm">
                <MessageCircle className="w-4 h-4 mr-2" /> Message
              </Button>
            </div>
          </div>
        </div>

        {/* Restaurant Bio */}
        <div className="mt-6">
          <h2 className="text-lg font-semibold mb-2">About</h2>
          <p className="text-gray-700">{restaurant.bio}</p>
        </div>

        {/* Key Details Bar */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-6 py-4 border-t">
          <div className="flex items-center gap-2">
            <MapPin className="w-5 h-5 text-primary" />
            <span>{restaurant.location}</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="w-5 h-5 text-primary" />
            <span>{restaurant.openingHours}</span>
          </div>
          <div className="flex items-center gap-2">
            <Utensils className="w-5 h-5 text-primary" />
            <span>{restaurant.cuisine.join(", ")}</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-3 mt-4">
          <Button variant="outline" className="flex-1 md:flex-none">
            Get Directions
          </Button>
          <Button variant="outline" className="flex-1 md:flex-none">
            Call Restaurant
          </Button>
        </div>
      </div>

      {/* Main Content Tabs */}
      <Tabs defaultValue="menu" className="w-full mt-6">
        <TabsList className="w-full px-4">
          <TabsTrigger value="menu">Menu</TabsTrigger>
          <TabsTrigger value="reviews">Reviews</TabsTrigger>
        </TabsList>

        {/* Menu Tab */}
        <TabsContent value="menu" className="px-4 py-6">
          <div className="space-y-6">
            {menuItems.map((item, i) => (
              <div key={i} className="flex gap-4 border rounded-lg p-4 hover:shadow-md transition-shadow">
                <div className="relative w-24 h-24 flex-shrink-0">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-cover rounded-lg"
                  />
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <h3 className="text-lg font-semibold">{item.name}</h3>
                    <p className="text-primary font-bold">{item.price}</p>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">{item.description}</p>
                  <div className="flex items-center justify-between mt-3">
                    <div className="flex items-center gap-4 text-sm">
                      <span className="flex items-center gap-1 text-gray-500">
                        <Heart className="w-4 h-4 text-red-400" /> {item.likes}
                      </span>
                      <span className="flex items-center gap-1 text-gray-500">
                        <MessageCircle className="w-4 h-4 text-blue-400" /> {item.comments}
                      </span>
                    </div>
                    <div className="flex gap-2">
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => addToCart(item.name, item.price)}
                        className="flex items-center gap-1"
                      >
                        <ShoppingCart className="w-4 h-4" />
                        <span>Add</span>
                      </Button>
                      <Button 
                        size="sm" 
                        onClick={() => handleInstantOrder(item)}
                        className="flex items-center gap-1 bg-green-600 hover:bg-green-700"
                      >
                        <span>Order</span>
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </TabsContent>

        {/* Reviews Tab */}
        <TabsContent value="reviews" className="px-4 py-6">
          <div className="space-y-6">
            {/* Add Review Form */}
            <div className="border rounded-lg p-4">
              <h3 className="font-medium mb-3">Add Your Review</h3>
              <div className="flex items-center mb-3">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className="w-6 h-6 cursor-pointer text-yellow-400 fill-yellow-400"
                  />
                ))}
              </div>
              <Textarea
                placeholder="Share your dining experience..."
                className="mb-3"
              />
              <Button className="w-full bg-green-600 hover:bg-green-700">
                Submit Review
              </Button>
            </div>

            {/* Existing Reviews */}
            {reviews.map((review, i) => (
              <div key={i} className="border rounded-lg p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold">{review.user}</h3>
                    <div className="flex items-center gap-1 mt-1">
                      {[...Array(5)].map((_, star) => (
                        <Star
                          key={star}
                          className={`w-4 h-4 ${
                            star < review.rating
                              ? "text-yellow-500 fill-yellow-500"
                              : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                  <span className="text-sm text-gray-500">{review.date}</span>
                </div>
                <p className="mt-2 text-gray-700">{review.comment}</p>
              </div>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      {/* Instant Order Modal */}
      {showOrderModal && currentOrderItem && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-gray-900 w-full max-w-md rounded-lg p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Order {currentOrderItem.name}</h2>
              <button 
                onClick={() => setShowOrderModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="font-medium">Price:</span>
                <span className="text-primary font-bold">{currentOrderItem.price}</span>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="font-medium">Quantity:</span>
                <div className="flex items-center gap-2">
                  <Button 
                    size="sm" 
                    variant="outline" 
                    onClick={() => setCurrentOrderItem(prev => prev ? {
                      ...prev,
                      quantity: Math.max(1, prev.quantity - 1)
                    } : null)}
                    className="w-8 h-8 p-0"
                  >
                    -
                  </Button>
                  <span>{currentOrderItem.quantity}</span>
                  <Button 
                    size="sm" 
                    variant="outline" 
                    onClick={() => setCurrentOrderItem(prev => prev ? {
                      ...prev,
                      quantity: prev.quantity + 1
                    } : null)}
                    className="w-8 h-8 p-0"
                  >
                    +
                  </Button>
                </div>
              </div>
              
              <div>
                <label className="block font-medium mb-2">Special Instructions</label>
                <Textarea
                  placeholder="Any special requests or dietary restrictions?"
                  value={currentOrderItem.specialInstructions}
                  onChange={(e) => setCurrentOrderItem(prev => prev ? {
                    ...prev,
                    specialInstructions: e.target.value
                  } : null)}
                />
              </div>
              
              <Button 
                className="w-full bg-green-600 hover:bg-green-700 mt-4"
                onClick={handleOrderSubmit}
              >
                Place Order (TZS {parseInt(currentOrderItem.price.replace(/[^0-9]/g, '')) * currentOrderItem.quantity})
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Shopping Cart Sidebar */}
      {showCart && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-end">
          <div className="bg-white dark:bg-gray-900 w-full max-w-md h-full p-4 overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Your Order</h2>
              <button 
                onClick={() => setShowCart(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                &times;
              </button>
            </div>
            
            {cart.length === 0 ? (
              <p className="text-gray-500 text-center py-8">Your cart is empty</p>
            ) : (
              <div className="space-y-4">
                {cart.map((item, index) => (
                  <div key={index} className="flex justify-between items-center border-b pb-3">
                    <div>
                      <h3 className="font-medium">{item.name}</h3>
                      <p className="text-sm text-gray-500">{item.price}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button 
                        size="sm" 
                        variant="outline" 
                        onClick={() => removeFromCart(item.name)}
                        className="w-8 h-8 p-0"
                      >
                        -
                      </Button>
                      <span>{item.quantity}</span>
                      <Button 
                        size="sm" 
                        variant="outline" 
                        onClick={() => addToCart(item.name, item.price)}
                        className="w-8 h-8 p-0"
                      >
                        +
                      </Button>
                    </div>
                  </div>
                ))}
                
                <div className="border-t pt-4">
                  <div className="flex justify-between font-bold text-lg">
                    <span>Total:</span>
                    <span>TZS {getTotalPrice()}</span>
                  </div>
                  <Button className="w-full mt-4 bg-green-600 hover:bg-green-700">
                    Proceed to Checkout
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Fixed Call-to-Action Bar (Mobile) */}
      <div className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-900 border-t p-3 flex justify-between md:hidden">
        <Button 
          variant="outline" 
          className="flex-1 relative"
          onClick={() => setShowCart(true)}
        >
          <ShoppingCart className="w-4 h-4 mr-2" />
          <span>Cart</span>
          {cart.length > 0 && (
            <span className="absolute -top-2 -right-2 bg-primary text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
              {getTotalItems()}
            </span>
          )}
        </Button>
        <Button className="flex-1 bg-green-600 hover:bg-green-700">
          Place Order
        </Button>
      </div>

      {/* Desktop Cart Button */}
      <div className="fixed bottom-8 right-8 hidden md:block">
        <Button 
          variant="default" 
          size="lg" 
          className="rounded-full shadow-lg relative"
          onClick={() => setShowCart(true)}
        >
          <ShoppingCart className="w-5 h-5 mr-2" />
          <span>Order</span>
          {cart.length > 0 && (
            <span className="absolute -top-2 -right-2 bg-primary text-white text-xs rounded-full w-6 h-6 flex items-center justify-center">
              {getTotalItems()}
            </span>
          )}
        </Button>
      </div>
    </div>
  );
}