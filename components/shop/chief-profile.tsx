"use client";

import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Star, Heart, MessageCircle, MoreHorizontal, MapPin, Share2, Plus } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Image from "next/image";
import Link from "next/link";
import { Textarea } from "@/components/ui/textarea";

export default function ChefProfile() {
  const chef = {
    name: "Chef Amina",
    username: "@swahilichef",
    image: "/chefs/mwanaisha.jpg",
    bio: "Award-winning Swahili cuisine specialist | Private chef & cooking classes | Mombasa, Kenya",
    location: "Mombasa, Kenya",
    posts: 142,
    likes: "24.5k",
    rating: 4.8,
  };

  const posts = [
    { id: 1, image: "/foods/pilau.jpg", likes: 320, comments: 45 },
    { id: 2, image: "/foods/nyama.jpg", likes: 410, comments: 58 },
    { id: 3, image: "/foods/chapati.jpg", likes: 280, comments: 22 },
    { id: 4, image: "/foods/samaki.jpg", likes: 150, comments: 14 },
    { id: 5, image: "/foods/biryani.jpg", likes: 290, comments: 39 },
    { id: 6, image: "/foods/chips.jpg", likes: 360, comments: 41 },
  ];

  const reviews = [
    {
      id: 1,
      user: "Fatma",
      text: "Best pilau I've ever had, authentic Swahili taste!",
      rating: 5,
    },
    {
      id: 2,
      user: "James",
      text: "The chapatis were soft and delicious, highly recommend.",
      rating: 4,
    },
  ];

  const handleShareProfile = () => {
    navigator.share({
      title: `Check out ${chef.name}'s profile`,
      text: chef.bio,
      url: window.location.href,
    }).catch(() => {
      navigator.clipboard.writeText(window.location.href);
      alert("Profile link copied to clipboard!");
    });
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Profile Header - Instagram-style layout */}
      <div className="flex flex-col md:flex-row gap-6 mb-8">
        {/* Left Column - Avatar (Instagram position) */}
        <div className="flex justify-center md:block md:w-1/4">
          <Avatar className="h-28 w-28 sm:h-32 sm:w-32 border-2 border-white shadow-md">
            <AvatarImage src={chef.image} alt={chef.name} />
            <AvatarFallback>{chef.name.charAt(0)}</AvatarFallback>
          </Avatar>
        </div>

        {/* Right Column - Profile Info */}
        <div className="md:w-3/4 space-y-4">
          {/* Username and Actions - Top Row */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-4">
            <h1 className="text-xl font-bold">{chef.username}</h1>
            <div className="flex gap-2">
              <Button variant="outline" className="rounded-lg gap-2 text-sm">
                <MessageCircle className="w-4 h-4" /> Message
              </Button>
              <Button 
                variant="outline" 
                size="icon" 
                className="rounded-lg"
                onClick={handleShareProfile}
              >
                <Share2 className="w-4 h-4" />
              </Button>
              <Button variant="outline" size="icon" className="rounded-lg">
                <MoreHorizontal className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Stats - Middle Row */}
          <div className="flex gap-6 text-center mb-4">
            <div>
              <span className="font-bold block">{chef.posts}</span>
              <span className="text-sm text-gray-500">Posts</span>
            </div>
            <div>
              <span className="font-bold block">{chef.likes}</span>
              <span className="text-sm text-gray-500">Likes</span>
            </div>
          </div>

          {/* Bio - Bottom Section */}
          <div className="space-y-2">
            <h2 className="font-bold">{chef.name}</h2>
            <p className="text-gray-600">{chef.bio}</p>
            <div className="flex items-center gap-4 text-sm">
              <span className="flex items-center gap-1 text-gray-600">
                <MapPin className="w-4 h-4" /> {chef.location}
              </span>
              <span className="flex items-center gap-1 text-yellow-600">
                <Star className="w-4 h-4 fill-yellow-400" /> {chef.rating}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="posts" className="w-full">
        <TabsList className="w-full grid grid-cols-2 border-b">
          <TabsTrigger value="posts" className="py-3">
            <div className="flex items-center gap-1">
              <span>Posts</span>
            </div>
          </TabsTrigger>
          <TabsTrigger value="reviews" className="py-3">
            <div className="flex items-center gap-1">
              <span>Reviews</span>
            </div>
          </TabsTrigger>
        </TabsList>

        {/* Posts Grid - Instagram style */}
        <TabsContent value="posts" className="py-4">
          <div className="grid grid-cols-3 gap-1">
            {posts.map((post) => (
              <Link
                key={post.id}
                href={`/p/${post.id}`}
                className="group relative aspect-square"
              >
                <Image
                  src={post.image}
                  alt={`Post by ${chef.name}`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 33vw, 250px"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                  <div className="flex items-center gap-4 text-white">
                    <span className="flex items-center gap-1">
                      <Heart className="w-5 h-5" /> {post.likes}
                    </span>
                    <span className="flex items-center gap-1">
                      <MessageCircle className="w-5 h-5" /> {post.comments}
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </TabsContent>

        {/* Reviews Section */}
        <TabsContent value="reviews" className="py-6 space-y-6">
          {/* Add Review Form */}
          <div className="p-4 rounded-lg border">
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
              placeholder="Share your experience with this chef..."
              className="mb-3"
            />
            <Button className="w-full bg-green-600 hover:bg-green-700 text-white">
              <Plus className="w-4 h-4 mr-2" /> Submit Review
            </Button>
          </div>

          {/* Existing Reviews */}
          {reviews.map((review) => (
            <div key={review.id} className="p-4 border rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <p className="font-semibold">{review.user}</p>
                <div className="flex items-center gap-1 text-yellow-600">
                  {Array.from({ length: review.rating }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-yellow-400" />
                  ))}
                </div>
              </div>
              <p className="text-sm text-gray-700">{review.text}</p>
            </div>
          ))}
        </TabsContent>
      </Tabs>
    </div>
  );
}