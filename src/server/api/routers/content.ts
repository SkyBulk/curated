import { createTRPCRouter, protectedProcedure } from "../trpc";

const content =
  "# The Benefits of Outdoor Exercise\n\nIn today's fast-paced world, it's easy to get caught up in the hustle and bustle of daily life. Many of us spend our days indoors, whether at work, school, or home. However, there are numerous benefits to taking your workout routine outside and enjoying the great outdoors. In this article, we'll explore some of the advantages of outdoor exercise.\n\n## 1. Fresh Air and Vitamin D\n\nOne of the most obvious benefits of outdoor exercise is the opportunity to breathe in fresh air. Unlike indoor spaces, the outdoors provide a constant supply of oxygen-rich air, which can invigorate your lungs and boost your energy levels. Additionally, spending time outdoors exposes you to natural sunlight, allowing your body to produce vitamin D, which is essential for bone health and overall well-being.\n\n## 2. Increased Motivation\n\nThe beauty of nature can be a powerful motivator. Whether you're jogging through a scenic park or cycling along a picturesque trail, the natural surroundings can inspire you to push yourself harder and stay committed to your fitness goals. The ever-changing outdoor scenery can make exercise feel less like a chore and more like an enjoyable adventure.\n\n## 3. Variety of Activities\n\nOutdoor exercise offers a wide range of activities to choose from. You can go for a hike in the mountains, swim in a crystal-clear lake, practice yoga in a serene garden, or play a friendly game of soccer in a local park. With so many options, it's easy to find an outdoor activity that suits your interests and fitness level.\n\n## 4. Stress Reduction\n\nNature has a calming effect on the mind. When you exercise outdoors, you have the chance to escape from the noise and stress of urban life. The tranquility of nature can help reduce stress levels, improve your mood, and enhance your overall mental well-being.\n\n## 5. Connection to the Environment\n\nEngaging in outdoor exercise fosters a deeper connection to the environment. You'll develop a greater appreciation for the natural world and become more aware of the importance of preserving it for future generations. This heightened environmental consciousness can motivate you to make eco-friendly choices in other aspects of your life as well.\n\n## Conclusion\n\nIncorporating outdoor exercise into your fitness routine can have numerous physical and mental health benefits. From the fresh air and natural beauty to the variety of activities and stress reduction, there are plenty of reasons to take your workout outdoors. So, the next time you're considering hitting the gym, why not step outside and embrace the many advantages of outdoor exercise?\n\nRemember, nature is your gym, and it's always open!";

function getFreeContent(content: string) {
  const paragraphs = content.split("\n\n");
  const freeParagraphs = paragraphs.slice(0, 6);
  const freeContent = freeParagraphs.join("\n\n");
  return freeContent;
}

export const contentRouter = createTRPCRouter({
  getPrivateArticle: protectedProcedure.query(({ ctx }) => {
    const isSubscribed = ctx.session.user.isActive;

    return {
      metaTitle: "The Benefits of Outdoor Exercise",
      metaDescription: "",
      content: isSubscribed ? content : getFreeContent(content),
    };
  }),
});
