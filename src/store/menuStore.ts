
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: string;
  image: string;
  category: string;
}

interface MenuState {
  menu: {
    starters: MenuItem[];
    mains: MenuItem[];
    desserts: MenuItem[];
    drinks: MenuItem[];
  };
  addMenuItem: (item: MenuItem) => void;
  updateMenuItem: (id: string, updatedItem: Partial<MenuItem>) => void;
  removeMenuItem: (id: string) => void;
}

// Helper to generate a unique ID
const generateId = () => `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

export const useMenuStore = create<MenuState>()(
  persist(
    (set) => ({
      menu: {
        starters: [
          {
            id: "s1",
            name: "Wild Mushroom Soup",
            description: "Creamy soup with assorted wild mushrooms, truffle oil and herb croutons",
            price: "$12",
            image: "https://images.unsplash.com/photo-1476718406336-bb5a9690ee2a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            category: "starters"
          },
          {
            id: "s2",
            name: "Prawn Ceviche",
            description: "Fresh prawns cured in citrus juices with avocado, chili and cilantro",
            price: "$16",
            image: "https://images.unsplash.com/photo-1639767101401-56c1a1c5643b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            category: "starters"
          },
          {
            id: "s3",
            name: "Burrata Salad",
            description: "Creamy burrata with heirloom tomatoes, basil oil, and aged balsamic",
            price: "$14",
            image: "https://images.unsplash.com/photo-1505253514580-aefc83aaad32?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            category: "starters"
          }
        ],
        mains: [
          {
            id: "m1",
            name: "Herb-Crusted Rack of Lamb",
            description: "With roasted root vegetables, pomme purée and red wine jus",
            price: "$36",
            image: "https://images.unsplash.com/photo-1514516345957-556ca7c90a40?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            category: "mains"
          },
          {
            id: "m2",
            name: "Pan-Seared Sea Bass",
            description: "With saffron risotto, fennel salad and lemon butter sauce",
            price: "$32",
            image: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            category: "mains"
          },
          {
            id: "m3",
            name: "Wild Mushroom Risotto",
            description: "Arborio rice with assorted wild mushrooms, white wine, parmesan and truffle oil",
            price: "$28",
            image: "https://images.unsplash.com/photo-1633964913295-ceb43826ee17?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            category: "mains"
          }
        ],
        desserts: [
          {
            id: "d1",
            name: "Dark Chocolate Fondant",
            description: "With vanilla bean ice cream and salted caramel sauce",
            price: "$14",
            image: "https://images.unsplash.com/photo-1617305855058-336d24456869?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            category: "desserts"
          },
          {
            id: "d2",
            name: "Lemon Tart",
            description: "With Italian meringue, fresh berries and basil syrup",
            price: "$12",
            image: "https://images.unsplash.com/photo-1464307074828-94a02891d7e9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            category: "desserts"
          },
          {
            id: "d3",
            name: "Cheese Selection",
            description: "Assorted artisanal cheeses with quince paste, grapes and crackers",
            price: "$18",
            image: "https://images.unsplash.com/photo-1452195100486-9cc805987862?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            category: "desserts"
          }
        ],
        drinks: [
          {
            id: "dr1",
            name: "Signature Cocktail",
            description: "House-infused gin with elderflower, lemon, and prosecco",
            price: "$14",
            image: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            category: "drinks"
          },
          {
            id: "dr2",
            name: "Aged Negroni",
            description: "Barrel-aged gin, Campari, and sweet vermouth with orange twist",
            price: "$16",
            image: "https://images.unsplash.com/photo-1527761939622-933c72e27ad1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            category: "drinks"
          },
          {
            id: "dr3",
            name: "Wine Selection",
            description: "Carefully curated selection of fine wines from around the world",
            price: "From $12",
            image: "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            category: "drinks"
          }
        ]
      },
      
      addMenuItem: (item) => set((state) => {
        const category = item.category as keyof typeof state.menu;
        const newItem = { ...item, id: item.id || generateId() };
        
        return {
          menu: {
            ...state.menu,
            [category]: [...state.menu[category], newItem]
          }
        };
      }),
      
      updateMenuItem: (id, updatedItem) => set((state) => {
        // Find which category the item is in
        let category: keyof typeof state.menu | null = null;
        
        for (const cat in state.menu) {
          if (state.menu[cat as keyof typeof state.menu].some(item => item.id === id)) {
            category = cat as keyof typeof state.menu;
            break;
          }
        }
        
        if (!category) return state;
        
        // If category is changing, we need to remove from old and add to new
        if (updatedItem.category && updatedItem.category !== category) {
          const oldItem = state.menu[category].find(item => item.id === id);
          if (!oldItem) return state;
          
          const newItem = { ...oldItem, ...updatedItem };
          const newCategory = updatedItem.category as keyof typeof state.menu;
          
          return {
            menu: {
              ...state.menu,
              [category]: state.menu[category].filter(item => item.id !== id),
              [newCategory]: [...state.menu[newCategory], newItem]
            }
          };
        }
        
        // If not changing category, just update in place
        return {
          menu: {
            ...state.menu,
            [category]: state.menu[category].map(item => 
              item.id === id ? { ...item, ...updatedItem } : item
            )
          }
        };
      }),
      
      removeMenuItem: (id) => set((state) => {
        // Find which category the item is in
        for (const category in state.menu) {
          const typedCategory = category as keyof typeof state.menu;
          if (state.menu[typedCategory].some(item => item.id === id)) {
            return {
              menu: {
                ...state.menu,
                [typedCategory]: state.menu[typedCategory].filter(item => item.id !== id)
              }
            };
          }
        }
        
        return state;
      })
    }),
    {
      name: 'menu-storage'
    }
  )
);
