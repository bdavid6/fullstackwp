import { app } from "./server";

//const PORT = process.env.PORT || 3000;
app.listen(3000, () => {
    console.log(`Server started on PORT: 3000}.`);
});
