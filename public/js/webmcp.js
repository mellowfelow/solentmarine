(function () {
  if (typeof navigator === 'undefined' || !navigator.modelContext) return;
  navigator.modelContext.provideContext({
    tools: [
      {
        name: "browse_category",
        description: "Browse Solent Marine UK outboards by category: portable, mid-range, high-horsepower, electric, or parts",
        inputSchema: {
          type: "object",
          properties: {
            category: {
              type: "string",
              enum: ["portable", "mid-range", "high-horsepower", "electric", "parts"]
            }
          }
        },
        execute: async ({ category }) => {
          const valid = ["portable", "mid-range", "high-horsepower", "electric", "parts"];
          const url = category && valid.includes(category)
            ? `https://solentmarineoutboards.co.uk/shop/${category}/`
            : `https://solentmarineoutboards.co.uk/shop/`;
          window.location.href = url;
          return { url };
        }
      },
      {
        name: "order_via_whatsapp",
        description: "Initiate direct marine rigging and engine consultation via WhatsApp. Minimum order £50. Human completes the order.",
        inputSchema: {
          type: "object",
          properties: {
            message: { type: "string" }
          }
        },
        execute: async ({ message }) => {
          const greeting = "Hi Solent Marine Outboards UK, ";
          const url = `https://wa.me/447700900888?text=${encodeURIComponent(message || greeting)}`;
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
          window.location.href = `https://solentmarineoutboards.co.uk/contact/`;
          return { url: `https://solentmarineoutboards.co.uk/contact/` };
        }
      }
    ]
  });
})();
