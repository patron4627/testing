
import { motion } from "framer-motion";
import PageTransition from "@/components/PageTransition";
import SectionContainer from "@/components/SectionContainer";
import { Button } from "@/components/ui/button";
import { ArrowRight, Star } from "lucide-react";
import { Link } from "react-router-dom";

const Home = () => {
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  return (
    <PageTransition>
      {/* Hero Section */}
      <div className="relative h-screen flex items-center justify-center overflow-hidden bg-[url('https://images.unsplash.com/photo-1555396273-367ea4eb4db5?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80')] bg-cover bg-center">
        <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]"></div>
        
        <div className="relative z-10 text-white max-w-4xl mx-auto px-4 text-center">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="space-y-6"
          >
            <motion.p variants={fadeInUp} className="subheading text-white/90">
              Culinary Excellence
            </motion.p>
            <motion.h1 variants={fadeInUp} className="heading-xl">
              A Modern Dining Experience
            </motion.h1>
            <motion.p variants={fadeInUp} className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto">
              Discover a unique blend of traditional flavors and contemporary techniques, creating an unforgettable dining journey.
            </motion.p>
            <motion.div variants={fadeInUp} className="flex justify-center space-x-4 pt-4">
              <Button asChild size="lg" className="bg-white text-primary hover:bg-white/90">
                <Link to="/menu">
                  View Menu
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="border-white text-white hover:bg-white/10">
                <Link to="/contact">
                  Reserve a Table
                </Link>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* About Section */}
      <SectionContainer className="bg-white">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <p className="subheading mb-2">Our Story</p>
            <h2 className="heading-lg mb-6">Crafting Culinary Art Since 2010</h2>
            <p className="text-muted-foreground mb-6">
              Founded with a passion for exceptional food and memorable experiences, Culina has evolved into a culinary destination that celebrates the art of dining.
            </p>
            <p className="text-muted-foreground mb-6">
              Our chef brings together global influences and local ingredients to create dishes that surprise and delight, while our attentive service ensures every visit is special.
            </p>
            <Button asChild className="mt-2">
              <Link to="/contact">
                Learn More <ArrowRight size={16} className="ml-2" />
              </Link>
            </Button>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="aspect-square overflow-hidden rounded-lg">
              <img 
                src="https://images.unsplash.com/photo-1600565193348-f74bd3c7ccdf?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                alt="Chef preparing a dish"
                className="w-full h-full object-cover transform transition-transform duration-500 hover:scale-105"
              />
            </div>
            <div className="absolute -bottom-6 -left-6 glass rounded-lg p-6 max-w-xs">
              <div className="flex items-center mb-2">
                <Star className="text-amber-500 w-4 h-4 fill-amber-500" />
                <Star className="text-amber-500 w-4 h-4 fill-amber-500" />
                <Star className="text-amber-500 w-4 h-4 fill-amber-500" />
                <Star className="text-amber-500 w-4 h-4 fill-amber-500" />
                <Star className="text-amber-500 w-4 h-4 fill-amber-500" />
              </div>
              <p className="text-sm italic">
                "The attention to detail in presentation and flavors is unmatched. A truly exceptional dining experience."
              </p>
              <p className="text-xs font-medium mt-2">— Food & Wine Magazine</p>
            </div>
          </motion.div>
        </div>
      </SectionContainer>

      {/* Featured Menu Section */}
      <SectionContainer className="bg-secondary/50">
        <div className="text-center mb-16">
          <p className="subheading mb-2">Culinary Highlights</p>
          <h2 className="heading-lg mb-4">Our Signature Dishes</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Explore a selection of our most beloved creations, each telling a unique story through carefully selected ingredients and expert preparation.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              name: "Pan-Seared Scallops",
              description: "With cauliflower purée, bacon jam, and micro herbs",
              image: "https://images.unsplash.com/photo-1635146037526-e3518609e1b6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
              price: "$24"
            },
            {
              name: "Truffle Risotto",
              description: "Arborio rice, wild mushrooms, parmesan, and fresh truffle",
              image: "https://images.unsplash.com/photo-1633964913295-ceb43826ee17?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
              price: "$28"
            },
            {
              name: "Herb-Crusted Lamb",
              description: "With roasted root vegetables and red wine jus",
              image: "https://images.unsplash.com/photo-1514516345957-556ca7c90a40?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
              price: "$36"
            }
          ].map((dish, index) => (
            <motion.div
              key={dish.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group"
            >
              <div className="bg-white rounded-lg overflow-hidden shadow-md transition-all duration-300 hover:shadow-lg">
                <div className="h-64 overflow-hidden">
                  <img 
                    src={dish.image} 
                    alt={dish.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="font-serif text-xl font-medium">{dish.name}</h3>
                    <span className="font-serif text-lg">{dish.price}</span>
                  </div>
                  <p className="text-muted-foreground text-sm">{dish.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <Button asChild size="lg">
            <Link to="/menu">
              View Full Menu <ArrowRight size={16} className="ml-2" />
            </Link>
          </Button>
        </div>
      </SectionContainer>

      {/* Call to Action */}
      <SectionContainer className="bg-primary text-primary-foreground">
        <div className="text-center max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h2 className="heading-lg mb-6">Reserve Your Table Today</h2>
            <p className="text-primary-foreground/80 mb-8 text-lg">
              Experience our exceptional cuisine and hospitality. We look forward to serving you.
            </p>
            <Button asChild size="lg" className="bg-white text-primary hover:bg-white/90">
              <Link to="/contact">
                Make a Reservation
              </Link>
            </Button>
          </motion.div>
        </div>
      </SectionContainer>
    </PageTransition>
  );
};

export default Home;
