const initialState = {
  items: {},
  totalPrice: 0,
  totalCount: 0,
};

const getTotalPrice = (arr) => arr.reduce((sum, obj) => obj.price + sum, 0);
const getTotalCount = (a) => a.reduce((c,d) => c + d.count ,0) ;

const _get = (obj, path) => {
  const [firstKey, ...keys] = path.split(".");
  return keys.reduce((val, key) => {
    return val[key];
  }, obj[firstKey]);
};

const getTotalSum = (obj, path) => {
  return Object.values(obj).reduce((sum, obj) => {
    const value = _get(obj, path);
    return sum + value;
  }, 0);
};

const cart = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_PIZZA_CART": {
      const { id, type, size, price } = action.payload;

      let currentPizzaItems = !state.items[id]
        ? []
        : [...state.items[id].items];

      let itemFound = false;

      currentPizzaItems = currentPizzaItems.map((item) => {
        if (
          item.id === id &&
          item.type === type &&
          item.size === size &&
          item.price === price
        ) {
          itemFound = true;
          return {
            ...item,
            count: item.count ? item.count + 1 : 2,
          };
        }
        return item;
      });

      if (!itemFound) {
        currentPizzaItems.push({
          ...action.payload,
          count: 1,
        });
      }

      const newItems = {
        ...state.items,
        [id]: {
          items: currentPizzaItems,
          totalPrice: getTotalPrice(currentPizzaItems),
          totalCount: getTotalCount(currentPizzaItems)
         },
      };
     

      let totalCount = 0
      let totalPrice = 0
      Object.values(newItems).forEach((itemGroup) => {
        itemGroup.items.forEach((item) => {
          totalCount += item.count;
          totalPrice += item.count * item.price;
        })
      })

      return {
        ...state,
        items: newItems,
        totalCount,
        totalPrice,
      };
    }

    case "CLEAR_CART": {
      return { totalPrice: 0, totalCount: 0, items: {} };
    }

    case "REMOVE_CART_ITEM": {
      const { id, type, size, price } = action.payload;
      console.log(id, size);
      const newItems = { ...state.items };

      if (newItems[id]) {
        const updatedItems = newItems[id].items.filter(
          (item) =>
            !(item.type === type && item.size === size && item.price === price, console.log(item))
            
        );
        console.log(updatedItems.length === 0);

    
        if (updatedItems.length !== 0) {
          delete newItems[id];
        } else {
          newItems[id] = {
            ...newItems[id],
            items: updatedItems,
            totalPrice: getTotalPrice(updatedItems),
          };
        }
      }
    
      let totalCount = 0
      let totalPrice = 0
      Object.values(newItems).forEach((itemGroup) => {
        itemGroup.items.forEach((item) => {
          totalCount += item.count;
          totalPrice += item.count * item.price;
        })
      })
      console.log(newItems);
      return {
        ...state,
        items: newItems,
        totalCount,
        totalPrice,
      };
    }
    

    case "PLUS_CART_ITEM": {
      const { id, type, size, price } = action.payload;
    
  
      const oldItems = state.items[id] ? state.items[id].items : [];
      let itemFound = false;
    
      const updatedItems = oldItems.map((item) => {
        if (
          item.id === id &&
          item.type === type &&
          item.size === size &&
          item.price === price
        ) {
          itemFound = true;
          return {
            ...item,
            count: item.count ? item.count + 1 : 1, 
          };
        }
        return item;
      });
    
      if (!itemFound) {
        updatedItems.push({
          ...action.payload,
          count: 1,
        });
      }
    
      const newState = {
        ...state,
        items: {
          ...state.items,
          [id]: {
            ...state.items[id],
            items: updatedItems,
            totalPrice: getTotalPrice(updatedItems),
          },
        },
      };
    
      let totalCount = 0;
      let totalPrice = 0;
    
      Object.values(newState.items).forEach((itemGroup) => {
        itemGroup.items.forEach((item) => {
          totalCount += item.count;
          totalPrice += item.count * item.price;
        });
      });
    
      return {
        ...newState,
        totalCount: totalCount,
        totalPrice: totalPrice,
      };
    }
    
    case "MINUS_CART_ITEM": {
      const { id, type, size, price } = action.payload;

      const oldItems = state.items[id].items;
      let itemFound = false;

      const updatedItems = oldItems.map((item) => {
        if (
          item.id === id &&
          item.type === type &&
          item.size === size &&
          item.price === price
        ) {
          itemFound = true;
          return {
            ...item,
            count: item.count > 1 ? item.count - 1 : item.count,
          };
        }
        return item;
      });

      if (!itemFound) {
        updatedItems.push({
          ...action.payload,
          count: 1,
        });
      }
       const newState = {
        ...state,
        items: {
          ...state.items,
          [id]: {
            ...state.items[id],
            items: updatedItems,
            totalPrice: getTotalPrice(updatedItems),
          },
        },
      };
    
      let totalCount = 0;
      let totalPrice = 0;
    
      Object.values(newState.items).forEach((itemGroup) => {
        itemGroup.items.forEach((item) => {
          totalCount += item.count;
          totalPrice += item.count * item.price;
        });
      });
    
      return {
        ...newState,
        totalCount: totalCount,
        totalPrice: totalPrice,
      };
    }

    default:
      return state;
  }
};

export { cart };
