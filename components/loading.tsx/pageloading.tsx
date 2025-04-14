// app/loading.tsx
"use client";

import React from "react";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";

const PageLoading = () => {
  return (
    <div className="flex items-center justify-center h-screen w-full bg-white dark:bg-black">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="flex flex-col items-center space-y-4"
      >
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
        >
          <Loader2 className="text-green-600" size={48} />
        </motion.div>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-lg font-medium text-gray-700 dark:text-gray-300"
        >
          Loading, please wait...
        </motion.p>
      </motion.div>
    </div>
  );
};

export default PageLoading;
