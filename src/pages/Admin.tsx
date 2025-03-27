
import { useState } from "react";
import { motion } from "framer-motion";
import PageTransition from "@/components/PageTransition";
import SectionContainer from "@/components/SectionContainer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useMenuStore, MenuItem } from "@/store/menuStore";
import { Edit, Trash } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Admin = () => {
  const { menu, addMenuItem, updateMenuItem, removeMenuItem } = useMenuStore();
  const { toast } = useToast();
  
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editItemId, setEditItemId] = useState<string | null>(null);
  const [formData, setFormData] = useState<Partial<MenuItem>>({
    name: "",
    description: "",
    price: "",
    image: "",
    category: "starters"
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSelectChange = (value: string) => {
    setFormData({ ...formData, category: value });
  };

  const resetForm = () => {
    setFormData({
      name: "",
      description: "",
      price: "",
      image: "",
      category: "starters"
    });
    setIsEditMode(false);
    setEditItemId(null);
  };

  const handleAddOrUpdateItem = () => {
    if (!formData.name || !formData.description || !formData.price || !formData.image || !formData.category) {
      toast({
        title: "Missing Fields",
        description: "Please fill out all fields",
        variant: "destructive"
      });
      return;
    }

    if (isEditMode && editItemId) {
      updateMenuItem(editItemId, formData);
      toast({
        title: "Menu Item Updated",
        description: `${formData.name} has been updated successfully.`
      });
    } else {
      addMenuItem(formData as MenuItem);
      toast({
        title: "Menu Item Added",
        description: `${formData.name} has been added to the menu.`
      });
    }

    resetForm();
    setIsDialogOpen(false);
  };

  const handleEditItem = (item: MenuItem) => {
    setFormData({
      name: item.name,
      description: item.description,
      price: item.price,
      image: item.image,
      category: item.category
    });
    setIsEditMode(true);
    setEditItemId(item.id);
    setIsDialogOpen(true);
  };

  const handleDeleteItem = (id: string) => {
    removeMenuItem(id);
    toast({
      title: "Menu Item Removed",
      description: "The item has been removed from the menu."
    });
  };

  return (
    <PageTransition>
      {/* Admin Header */}
      <div className="bg-primary text-primary-foreground py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <h1 className="heading-xl mb-4">Admin Panel</h1>
            <p className="text-lg text-primary-foreground/80 max-w-2xl mx-auto">
              Manage your restaurant's menu items and content.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Admin Content */}
      <SectionContainer>
        <div className="max-w-6xl mx-auto">
          <Tabs defaultValue="starters" className="w-full">
            <div className="flex justify-between items-center mb-6">
              <TabsList className="grid grid-cols-4 w-auto">
                <TabsTrigger value="starters">Starters</TabsTrigger>
                <TabsTrigger value="mains">Mains</TabsTrigger>
                <TabsTrigger value="desserts">Desserts</TabsTrigger>
                <TabsTrigger value="drinks">Drinks</TabsTrigger>
              </TabsList>
              
              <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger asChild>
                  <Button onClick={() => {
                    resetForm();
                    setIsDialogOpen(true);
                  }}>
                    Add New Item
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[550px]">
                  <DialogHeader>
                    <DialogTitle>{isEditMode ? "Edit Menu Item" : "Add New Menu Item"}</DialogTitle>
                    <DialogDescription>
                      Fill out the details for this menu item.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="name" className="text-right">
                        Name
                      </Label>
                      <Input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className="col-span-3"
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="price" className="text-right">
                        Price
                      </Label>
                      <Input
                        id="price"
                        name="price"
                        value={formData.price}
                        onChange={handleInputChange}
                        placeholder="$20"
                        className="col-span-3"
                      />
                    </div>
                    <div className="grid grid-cols-4 items-start gap-4">
                      <Label htmlFor="description" className="text-right pt-2">
                        Description
                      </Label>
                      <Textarea
                        id="description"
                        name="description"
                        value={formData.description}
                        onChange={handleInputChange}
                        className="col-span-3"
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="image" className="text-right">
                        Image URL
                      </Label>
                      <Input
                        id="image"
                        name="image"
                        value={formData.image}
                        onChange={handleInputChange}
                        placeholder="https://example.com/image.jpg"
                        className="col-span-3"
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label className="text-right">Category</Label>
                      <Select
                        value={formData.category}
                        onValueChange={handleSelectChange}
                      >
                        <SelectTrigger className="col-span-3">
                          <SelectValue placeholder="Select a category" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="starters">Starters</SelectItem>
                          <SelectItem value="mains">Main Courses</SelectItem>
                          <SelectItem value="desserts">Desserts</SelectItem>
                          <SelectItem value="drinks">Drinks</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <DialogFooter>
                    <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                      Cancel
                    </Button>
                    <Button onClick={handleAddOrUpdateItem}>
                      {isEditMode ? "Update" : "Add"} Item
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
            
            {(["starters", "mains", "desserts", "drinks"] as const).map(category => (
              <TabsContent key={category} value={category}>
                <div className="space-y-6">
                  {menu[category].length === 0 ? (
                    <div className="text-center py-12 border rounded-lg bg-secondary/30">
                      <p className="text-muted-foreground">No items in this category yet.</p>
                      <Button 
                        variant="outline" 
                        className="mt-4"
                        onClick={() => {
                          resetForm();
                          setFormData({ ...formData, category });
                          setIsDialogOpen(true);
                        }}
                      >
                        Add Your First {category === "mains" ? "Main Course" : category.charAt(0).toUpperCase() + category.slice(1, -1)}
                      </Button>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 gap-6">
                      {menu[category].map(item => (
                        <div key={item.id} className="bg-white border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                          <div className="flex flex-col md:flex-row">
                            <div className="w-full md:w-1/4 h-48 md:h-auto">
                              <img 
                                src={item.image} 
                                alt={item.name} 
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <div className="w-full md:w-3/4 p-6 flex flex-col justify-between">
                              <div>
                                <div className="flex justify-between items-center mb-2">
                                  <h3 className="font-serif text-xl font-medium">{item.name}</h3>
                                  <span className="font-serif text-lg">{item.price}</span>
                                </div>
                                <p className="text-muted-foreground mb-4">{item.description}</p>
                              </div>
                              <div className="flex justify-end space-x-2">
                                <Button 
                                  variant="outline" 
                                  size="sm" 
                                  onClick={() => handleEditItem(item)}
                                >
                                  <Edit className="h-4 w-4 mr-2" />
                                  Edit
                                </Button>
                                
                                <AlertDialog>
                                  <AlertDialogTrigger asChild>
                                    <Button variant="destructive" size="sm">
                                      <Trash className="h-4 w-4 mr-2" />
                                      Delete
                                    </Button>
                                  </AlertDialogTrigger>
                                  <AlertDialogContent>
                                    <AlertDialogHeader>
                                      <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                                      <AlertDialogDescription>
                                        This will permanently delete {item.name} from your menu. This action cannot be undone.
                                      </AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter>
                                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                                      <AlertDialogAction onClick={() => handleDeleteItem(item.id)}>
                                        Delete
                                      </AlertDialogAction>
                                    </AlertDialogFooter>
                                  </AlertDialogContent>
                                </AlertDialog>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </SectionContainer>
    </PageTransition>
  );
};

export default Admin;
