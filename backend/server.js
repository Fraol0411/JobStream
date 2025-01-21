import app from "./app.js";

const PORT = 5000;

// app.listen(PORT, () => {
//   console.log(`Server running at ${PORT}`);
// });

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running at http://0.0.0.0:${PORT}`);
});
