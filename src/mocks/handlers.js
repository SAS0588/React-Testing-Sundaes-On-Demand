import { rest } from "msw";

export const handlers = [
  //rest handler for post
  rest.get("http://localhost:3030/scoops", (req, res, ctx) => {
    return res(
      ctx.json([
        { name: "Chocolate", imagePath: "/images/chocolate.png" },
        { name: "Vanilla", imagePath: "/images/vanilla.png" },
      ])
    );
  }),

  // rest handler for get
  rest.get("/user", null),
];
