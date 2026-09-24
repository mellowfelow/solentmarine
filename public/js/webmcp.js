(function () {
  if (typeof navigator === 'undefined' || !navigator.modelContext) return;
  navigator.modelContext.provideContext({
    tools: [
      {
        name: "search_outboards",
        description: "Search Solent Marine UK outboards by power, brand, shaft length, or price",
        inputSchema: {
          type: "object",
          properties: {
            query: { type: "string" },
            brand: { type: "string" },
            category: { type: "string" },
            max_price: { type: "number" }
          }
        },
        execute: async ({ query, brand, category, max_price }) => {
          const params = new URLSearchParams();
          if (query) params.set('q', query);
          if (brand) params.set('brand', brand);
          if (category) params.set('category', category);
          if (max_price) params.set('max_price', String(max_price));
          const res = await fetch(`https://outboardmotors.co.uk/api/search?${params}`);
          return res.json();
        }
      },
      {
        name: "browse_category",
        description: "Browse marine outboards by category (portable, mid-range, electric, high-horsepower)",
        inputSchema: {
          type: "object",
          properties: {
            category: { type: "string" }
          }
        },
        execute: async ({ category }) => {
          const url = category ? `https://outboardmotors.co.uk/shop/?category=${encodeURIComponent(category)}` : `https://outboardmotors.co.uk/shop/`;
          window.location.href = url;
          return { url };
        }
      },
      {
        name: "order_via_whatsapp",
        description: "Initiate direct marine rigging and engine consultation via WhatsApp. Minimum order £50. Human completes.",
        inputSchema: {
          type: "object",
          properties: {
            message: { type: "string" }
          }
        },
        execute: async ({ message }) => {
          const url = message ? `https://wa.me/447700900888?text=${encodeURIComponent(message)}` : `https://wa.me/447700900888`;
          window.open(url, '_blank');
          return { url };
        }
      },
      {
        name: "contact_engineers",
        description: "Contact Solent Marine Cowes engineering desk for technical or rigging questions",
        inputSchema: {
          type: "object",
          properties: {}
        },
        execute: async () => {
          window.location.href = `https://outboardmotors.co.uk/contact/`;
          return { url: `https://outboardmotors.co.uk/contact/` };
        }
      }
    ]
  });
})();
