import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { Button } from "./button";
import { Avatar, AvatarFallback, AvatarImage } from "./avatar";
import { useKarma } from "@/contexts/KarmaContext";

export function Sidebar() {
  const [darkMode, setDarkMode] = React.useState(true);
  
  React.useEffect(() => {
    const root = window.document.documentElement;
    if (darkMode) {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, [darkMode]);
  const [modMode, setModMode] = React.useState(false);
  const { karmaPoints, showKarmaAnimation } = useKarma();

  return (
    <aside
      className={cn(
        "w-64 bg-card border-r border-border/40 px-4 py-6 hidden lg:block",
        "dark:bg-[#1A1A1B] dark:text-zinc-200 dark:border-zinc-800",
        "transition-all duration-300 ease-in-out reddit-fade-in reddit-slide-in"
      )}
    >
      {/* Profile Section */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, type: "spring", stiffness: 260, damping: 20 }}
        className="flex flex-col items-center gap-3 mb-8"
      >
        <motion.div
          whileHover={{ scale: 1.05, rotate: [0, -5, 5, -5, 0] }}
          transition={{ duration: 0.3 }}
        >
          <Avatar className="w-16 h-16 border-2 border-redditOrange">
            <AvatarImage src="https://i.redd.it/snoovatar/avatars/42352902-6a11-4460-8824-33796b6593dd.png" />
            <AvatarFallback className="bg-redditOrange text-white">SN</AvatarFallback>
          </Avatar>
        </motion.div>
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-center"
        >
          <h3 className="font-semibold text-lg">SnooUser</h3>
          <p className="text-sm text-muted-foreground">🎂 Redditor since 2024</p>
          <motion.p 
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.4, type: "spring" }}
            className="text-xs text-muted mt-1"
          >
            <AnimatePresence>
              {showKarmaAnimation && (
                <motion.span
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="absolute text-green-400"
                >
                  +1
                </motion.span>
              )}
            </AnimatePresence>
            🏆 {karmaPoints} karma
          </motion.p>
        </motion.div>
      </motion.div>

      {/* Navigation Menu */}
      <nav className="space-y-2">
        {[
          { icon: "👤", text: "View Profile" },
          { icon: "🎭", text: "Edit Avatar" },
          { 
            icon: darkMode ? "🌙" : "☀️", 
            text: `${darkMode ? "Light" : "Dark"} Mode`, 
            onClick: () => {
              const root = window.document.documentElement;
              root.style.setProperty('--background-transition', 'background-color 0.5s cubic-bezier(0.4, 0, 0.2, 1)');
              root.style.setProperty('--text-transition', 'color 0.5s cubic-bezier(0.4, 0, 0.2, 1)');
              root.style.setProperty('--border-transition', 'border-color 0.5s cubic-bezier(0.4, 0, 0.2, 1)');
              setDarkMode(!darkMode);
              requestAnimationFrame(() => {
                requestAnimationFrame(() => {
                  root.style.setProperty('--background-transition', 'background-color 0.3s ease');
                  root.style.setProperty('--text-transition', 'color 0.3s ease');
                  root.style.setProperty('--border-transition', 'border-color 0.3s ease');
                });
              });
            } 
          },
          { icon: "🛡️", text: `Mod Mode ${modMode ? "(Active)" : ""}`, onClick: () => setModMode(!modMode), special: modMode },
          { icon: "⚙️", text: "Settings" }
        ].map((item, index) => (
          <motion.div
            key={item.text}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 + (index * 0.1), type: "spring", stiffness: 200, damping: 20 }}
          >
            <Button
              variant="ghost"
              className={cn(
                "w-full justify-start menu-hover",
                item.special && "text-green-400 hover:text-green-300"
              )}
              onClick={item.onClick}
            >
              <motion.span 
                className="flex items-center gap-2"
                whileHover={{ x: 5 }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
              >
                {item.icon} {item.text}
              </motion.span>
            </Button>
          </motion.div>
        ))}

        {/* Quirky Reddit-style Elements */}
        <motion.div 
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="mt-6 p-4 rounded-lg bg-zinc-800/30 border border-zinc-700/50"
        >
          <motion.p 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 }}
            className="text-sm text-zinc-400 mb-3"
          >
            🎮 Random Reddit Fact:
          </motion.p>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="text-xs text-zinc-500 italic"
          >
            {[
              "The upvote arrow isn't orange, it's 'orangered' (#FF4500). Mind = blown! 🤯",
              "Snoo, Reddit's alien mascot, got its name because 'What's new?' can be shortened to 'snoo'! 👽",
              "The downvote color is 'periwinkle' - fancy name for 'kinda blue' 💙",
              "Reddit's first comment was someone complaining about comments! 😅"
            ][Math.floor(Math.random() * 4)]}
          </motion.p>
        </motion.div>

        {/* Logout Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, type: "spring", stiffness: 200, damping: 20 }}
        >
          <Button
            variant="ghost"
            className="w-full justify-start mt-4 hover:bg-red-900/20 hover:text-red-400"
          >
            <motion.span 
              className="flex items-center gap-2"
              whileHover={{ x: 5 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
            >
              🚪 Log Out
            </motion.span>
          </Button>
        </motion.div>
      </nav>

      {/* Easter Egg */}
      <motion.div 
        className="mt-8 text-center"
        whileHover={{ scale: 1.1, rotate: [0, -5, 5, -5, 0] }}
        transition={{ duration: 0.3 }}
      >
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="text-[0.65rem] text-zinc-500 hover:text-redditOrange cursor-default"
        >
          *boop* 🤖
        </motion.p>
      </motion.div>
    </aside>
  );
}
