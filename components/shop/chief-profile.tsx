"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Star,
  Heart,
  Clock,
  MapPin,
  Phone,
  Mail,
  Globe,
  MessageCircle,
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { motion } from "framer-motion";
import Image from "next/image";
import { Link } from "@/i18n/routing";

export default function ChefProfile() {
  // Chef data
  const chef = {
    name: "Chef Amina Hassan",
    image: "/chefs/mwanaisha.jpg",
    specialty: "Swahili & Coastal Cuisine",
    rating: 4.8,
    reviews: 142,
    likes: 420,
    experience: "15 years",
    location: "Mombasa, Kenya",
    bio: "Award-winning chef specializing in authentic Swahili dishes with a modern twist. Trained in Zanzibar and worked in top restaurants across East Africa before starting my private catering service.",
    contact: {
      phone: "+254 712 345 678",
      email: "amina@swahiliflavor.com",
      website: "swahiliflavor.com",
    },
    availability: "Available for private events, cooking classes, and catering",
    signatureDishes: ["Biryani ya Kuku", "Pilau ya Samaki", "Viazi Karai"],
  };

  // Sample dishes
  const dishes = [
    {
      name: "Ugali",
      category: "East African",
      image: "/foods/ugali.jpg",
      likes: 240,
      comments: 32,
    },
    {
      name: "Pilau",
      category: "East African",
      image: "/foods/pilau.jpg",
      likes: 320,
      comments: 45,
    },
    {
      name: "Nyama Choma",
      category: "East African",
      image: "/foods/nyama.jpg",
      likes: 410,
      comments: 58,
    },
    {
      name: "Chapati",
      category: "East African",
      image: "/foods/chapati.jpg",
      likes: 280,
      comments: 22,
    },
    {
      name: "Samaki",
      category: "Seafood",
      image: "/foods/samaki.jpg",
      likes: 150,
      comments: 14,
    },
    {
      name: "Biriani",
      category: "East African",
      image: "/foods/biryani.jpg",
      likes: 290,
      comments: 39,
    },
    {
      name: "Chips",
      category: "Fast Food",
      image: "/foods/chips.jpg",
      likes: 360,
      comments: 41,
    },
  ];

  // Sample reviews
  const reviews = [
    {
      user: "Fatima A.",
      rating: 5,
      date: "2 weeks ago",
      comment:
        "Chef Amina's biryani is out of this world! She catered my wedding and all 300 guests were impressed.",
    },
    {
      user: "Raj P.",
      rating: 4,
      date: "1 month ago",
      comment:
        "Excellent Swahili flavors. The pilau was perfectly spiced. Would have given 5 stars if the delivery was a bit faster.",
    },
    {
      user: "James M.",
      rating: 5,
      date: "2 months ago",
      comment:
        "Took her cooking class and learned so much about coastal cuisine. Highly recommend!",
    },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Chef Header Section */}
      <div className="flex flex-col md:flex-row gap-8 mb-8">
        <div className="w-full md:w-1/3 lg:w-1/4">
          <Avatar className="h-48 w-48 mx-auto md:mx-0">
            <AvatarImage src={chef.image} alt={chef.name} />
            <AvatarFallback>{chef.name.charAt(0)}</AvatarFallback>
          </Avatar>
        </div>

        <div className="w-full md:w-2/3 lg:w-3/4 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <h1 className="text-3xl font-bold">{chef.name}</h1>
            <Button variant="outline" className="gap-2">
              <Heart className="w-4 h-4" />
              Follow
            </Button>
          </div>

          <div className="flex items-center gap-2">
            <Badge variant="secondary" className="gap-1">
              <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
              {chef.rating} ({chef.reviews} reviews)
            </Badge>
            <Badge variant="outline" className="gap-1">
              <Clock className="w-4 h-4" />
              {chef.experience} experience
            </Badge>
          </div>

          <h2 className="text-xl text-primary">{chef.specialty}</h2>

          <div className="flex items-center gap-2 text-sm">
            <MapPin className="w-4 h-4" />
            {chef.location}
          </div>

          <p className="text-gray-800 dark:text-gray-300">{chef.bio}</p>

          <div className="flex flex-wrap gap-2">
            {chef.signatureDishes.map((dish, i) => (
              <Badge key={i} variant="outline">
                {dish}
              </Badge>
            ))}
          </div>
        </div>
      </div>

      <Separator className="my-6" />

      {/* Main Content Tabs */}
      <Tabs defaultValue="dishes" className="w-full">
        <TabsList className="grid w-full grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          <TabsTrigger value="dishes">Dishes</TabsTrigger>
          <TabsTrigger value="reviews">Reviews</TabsTrigger>
          <TabsTrigger value="about">About</TabsTrigger>
          <TabsTrigger value="contact">Contact</TabsTrigger>
          <TabsTrigger value="events">Events</TabsTrigger>
        </TabsList>

        {/* Dishes Tab */}
        <TabsContent value="dishes" className="py-6">
          <div className="flex overflow-x-auto gap-4 sm:grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 sm:overflow-visible">
            {dishes.map((dish, i) => (
              <motion.div
                key={i}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="min-w-[250px] sm:min-w-0 flex-shrink-0"
              >
                <Card className="relative rounded-2xl overflow-hidden shadow-md h-60 lg:h-72 group hover:shadow-lg transition-shadow duration-300">
                  {/* Optimized background image */}
                  <div className="absolute inset-0 w-full h-full">
                    <Image
                      src={dish.image}
                      alt={`Image of ${dish.name}`}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src =
                          "/chef/default-chef.jpg";
                      }}
                    />
                  </div>

                  {/* Enhanced gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

                  {/* Engagement metrics with subtle animation */}
                  <motion.div
                    className="absolute top-3 right-3 flex items-center gap-3 bg-black/50 px-3 py-1 rounded-full text-white text-xs backdrop-blur-sm"
                    whileHover={{ scale: 1.05 }}
                  >
                    <div className="flex items-center gap-1 hover:text-red-400 transition-colors cursor-pointer">
                      <Heart className="w-4 h-4 text-red-400" />
                      <span>{dish.likes}</span>
                    </div>
                    <div className="flex items-center gap-1 hover:text-blue-400 transition-colors cursor-pointer">
                      <MessageCircle className="w-4 h-4 text-blue-400" />
                      <span>{dish.comments}</span>
                    </div>
                  </motion.div>

                  {/* Info overlay with improved spacing */}
                  <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                    <div className="mb-2">
                      <h3 className="text-lg font-bold line-clamp-1">
                        {dish.name}
                      </h3>
                      <p className="text-sm text-gray-300">{dish.category}</p>
                    </div>
                    <Button
                      variant="secondary"
                      size="sm"
                      className="bg-white/90 text-black hover:bg-white hover:shadow-md transition-all"
                      asChild
                    >
                      <Link href={`/dishes/${dish}/reviews`}>Review</Link>
                    </Button>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </TabsContent>

        {/* Reviews Tab */}
        <TabsContent value="reviews" className="py-6">
          <div className="space-y-6">
            {reviews.map((review, i) => (
              <Card key={i}>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-lg">{review.user}</CardTitle>
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
                </CardHeader>
                <CardContent>
                  <p>{review.comment}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* About Tab */}
        <TabsContent value="about" className="py-6">
          <Card>
            <CardHeader>
              <CardTitle>About Chef {chef.name.split(" ")[1]}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-medium mb-2">Cooking Style</h3>
                <p>
                  Specializes in traditional Swahili cuisine with modern
                  presentation techniques. Focuses on fresh coastal ingredients
                  and authentic spice blends.
                </p>
              </div>

              <div>
                <h3 className="font-medium mb-2">Experience</h3>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Head Chef at Tamarind Mombasa (2015-2020)</li>
                  <li>Sous Chef at Serena Beach Resort (2010-2015)</li>
                  <li>Culinary training at Zanzibar Culinary Institute</li>
                </ul>
              </div>

              <div>
                <h3 className="font-medium mb-2">Availability</h3>
                <p>{chef.availability}</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Contact Tab */}
        <TabsContent value="contact" className="py-6">
          <Card>
            <CardHeader>
              <CardTitle>Contact Chef {chef.name.split(" ")[1]}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-primary" />
                <a
                  href={`tel:${chef.contact.phone}`}
                  className="hover:underline"
                >
                  {chef.contact.phone}
                </a>
              </div>

              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-primary" />
                <a
                  href={`mailto:${chef.contact.email}`}
                  className="hover:underline"
                >
                  {chef.contact.email}
                </a>
              </div>

              <div className="flex items-center gap-3">
                <Globe className="w-5 h-5 text-primary" />
                <a
                  href={`https://${chef.contact.website}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline"
                >
                  {chef.contact.website}
                </a>
              </div>

              <div className="pt-4">
                <Button className="w-full sm:w-auto">Send Message</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Events Tab */}
        <TabsContent value="events" className="py-6">
          <Card>
            <CardHeader>
              <CardTitle>Upcoming Events</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="border rounded-lg p-4">
                <h3 className="font-medium">Swahili Cooking Masterclass</h3>
                <p className="text-sm text-gray-600 mt-1">
                  June 15, 2023 · 10:00 AM - 2:00 PM
                </p>
                <p className="mt-2">
                  Learn to make authentic biryani, pilau, and coconut fish curry
                  in this hands-on class.
                </p>
                <Button variant="outline" size="sm" className="mt-3">
                  Book Now
                </Button>
              </div>

              <div className="border rounded-lg p-4">
                <h3 className="font-medium">Ramadan Iftar Pop-Up</h3>
                <p className="text-sm text-gray-600 mt-1">
                  April 5-15, 2023 · 6:00 PM Daily
                </p>
                <p className="mt-2">
                  Special iftar menu featuring traditional Swahili Ramadan
                  dishes.
                </p>
                <Button variant="outline" size="sm" className="mt-3">
                  Reserve Table
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
