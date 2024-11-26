import { create } from "zustand";

export const useProductStore = create((set) => ({
    products: [],
    getProducts: async () => {
        try {
            const response = await fetch("/api/products")
            const data = await response.json()
            if (response.ok) {
                set({ products: data.data })
                return { success: true }
            }
            return { success: false, error: data.message }
        } catch (error) {
            console.error("Error fetching products:", error)
            return { success: false, error: error.message }
        }
    },
    createProduct: async (newProduct) => {
        try {
            if (!newProduct.name || !newProduct.price || !newProduct.image) {
               return {success: false, error: "Invalid product data"}
            }
            const response = await fetch("/api/products", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(newProduct)
            })
            const data = await response.json()
            if (!response.ok) {
                return {success: false, error: data.message}
            }
            set((state) => ({products: [...state.products, data.data]}))
            return {success: true, message: "Product created successfully"}
        } catch (error) {
            return {success: false, error: error.message}
        }
    },
    deleteProduct: async (productId) => {
        try {
            const response = await fetch(`/api/products/${productId}`, {
                method: 'DELETE'
            })
            const data = await response.json()
            
            if (response.ok) {
                // Remove product from state
                set((state) => ({
                    products: state.products.filter(p => p._id !== productId)
                }))
                return { success: true, message: "Product deleted successfully" }
            }
            return { success: false, error: data.message }
        } catch (error) {
            return { success: false, error: error.message }
        }
    },
    updateProduct: async (productId, updatedProduct) => {
        try {
            const response = await fetch(`/api/products/${productId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(updatedProduct)
            })
            const data = await response.json()
            
            if (response.ok) {
                // Update product in state
                set((state) => ({
                    products: state.products.map(p => 
                        p._id === productId ? data.data : p
                    )
                }))
                return { success: true, message: "Product updated successfully" }
            }
            return { success: false, error: data.message }
        } catch (error) {
            return { success: false, error: error.message }
        }
    }
}))
