
import { motion } from "framer-motion";
import PageTransition from "@/components/PageTransition";
import SectionContainer from "@/components/SectionContainer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useMenuStore } from "@/store/menuStore";
import { cn } from "@/lib/utils";

const Menu = () => {
  const { menu } = useMenuStore();
  
  return (
    <PageTransition>
      {/* Hero Section */}
      <div className="relative h-72 md:h-96 flex items-center justify-center overflow-hidden bg-[url('https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80')] bg-cover bg-center">
        <div className="absolute inset-0 bg-black/50 backdrop-blur-[1px]"></div>
        
        <div className="relative z-10 text-white max-w-4xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-4"
          >
            <p className="subheading text-white/90">Culinary Delight</p>
            <h1 className="heading-xl">Our Menu</h1>
            <p className="text-lg text-white/80 max-w-2xl mx-auto">
              Explore our seasonal dishes crafted with locally-sourced ingredients.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Menu Content */}
      <SectionContainer className="bg-white">
        <div className="max-w-5xl mx-auto">
          <Tabs defaultValue="starters" className="w-full">
            <TabsList className="w-full grid grid-cols-2 md:grid-cols-4 mb-10">
              <TabsTrigger value="starters">Starters</TabsTrigger>
              <TabsTrigger value="mains">Main Courses</TabsTrigger>
              <TabsTrigger value="desserts">Desserts</TabsTrigger>
              <TabsTrigger value="drinks">Drinks</TabsTrigger>
            </TabsList>
            
            {(["starters", "mains", "desserts", "drinks"] as const).map((category) => (
              <TabsContent key={category} value={category} className="mt-6">
                {menu[category].length === 0 ? (
                  <div className="text-center py-12">
                    <p className="text-muted-foreground">No items in this category yet.</p>
                  </div>
                ) : (
                  <div className="grid gap-10">
                    {menu[category].map((item, index) => (
                      <motion.div
                        key={item.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: index * 0.1 }}
                        className="flex flex-col md:flex-row gap-6 group"
                      >
                        <div className="w-full md:w-1/3 h-64 md:h-40 overflow-hidden rounded-lg">
                          <img 
                            src={item.image} 
                            alt={item.name}
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                          />
                        </div>
                        <div className="w-full md:w-2/3 flex flex-col justify-center">
                          <div className="flex justify-between items-center mb-2">
                            <h3 className="font-serif text-xl font-medium">{item.name}</h3>
                            <span className="font-serif text-lg">{item.price}</span>
                          </div>
                          <p className="text-muted-foreground">{item.description}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </SectionContainer>
      
      {/* Special Dietary Needs */}
      <SectionContainer className="bg-secondary/50">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h2 className="heading-md mb-6">Special Dietary Requirements</h2>
            <p className="text-muted-foreground mb-4">
              At Culina, we cater to various dietary needs. Please inform our staff of any allergies or dietary restrictions, and our chefs will happily accommodate your requirements.
            </p>
            <div className="flex flex-wrap justify-center gap-3 mt-8">
              {["Vegetarian", "Vegan", "Gluten-Free", "Dairy-Free", "Nut-Free"].map((diet) => (
                <span key={diet} className="inline-block px-4 py-2 bg-white rounded-full text-sm font-medium">
                  {diet}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </SectionContainer>
    </PageTransition>
  );
};

export default Menu;
