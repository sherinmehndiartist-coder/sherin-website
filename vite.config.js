import { defineConfig } from 'vite'
import { resolve } from 'path'

export default defineConfig({
    build: {
        rollupOptions: {
            input: {
                main: resolve(__dirname, 'index.html'),
                about: resolve(__dirname, 'about.html'),
                packages: resolve(__dirname, 'packages.html'),
                shop: resolve(__dirname, 'shop.html'),
                gallery: resolve(__dirname, 'gallery.html'),
                contact: resolve(__dirname, 'contact.html'),
                booking: resolve(__dirname, 'booking.html'),
                testimonial: resolve(__dirname, 'testimonial.html'),
                admin: resolve(__dirname, 'admin.html')
            }
        }
    }
})
