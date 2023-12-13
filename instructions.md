1. install dependencies 
- npm i express express-handlebars nodemon mongoose bcrypt jwt cookie-parser

2. configure bodyparser 
- app.use(express.urlencoded({ extended: false }));

3. configure Routes
- pravim router.js file i go exportvame v index.js

4. Add-vame images i css public files
5. add html files in views directory (predvarittelno sme installnali express-handlebars)
6. Configure handlebars v index.js
 - app.engine('hbs', handlebars.engine({extname: 'hbs'}))
- app.set('view engine', 'hbs');
- app.set('views', 'src/views');

7. Kopirame home page i go pravim main v papka views/layouts
 - v index.js 
 - opravqme putq v main.hbs da raboti css-a i fix-vame i drugite linkove
 - v home.hbs ostavqme samo section-a v main.hbs na mqstoto na section-a slagame {{{body}}}

8. Opravqme vsi4ki html na hbs
 - v papka views gi razdelqme na 2 papki user i post

9. Pravim home controller papka za home controller-a
 - v homeController.js 
 - vikame routera i go exportvame vutre slagame putq:

 const router = require("express").Router();

router.get("/", (req, res) => {
  // res.send("Hello home page!");

  res.render("home");
});

module.exports = router;

- v routera si go vikame :)

10. Vruzvame database s MongoDB mongoose

11. Prepare user functionality
- user controller
- add controller to routes
- fix navigations in the navbar da moje da vlizame vuv vsqka stranica
- render login page
- render register page


12. Populvame si name="" v register i login
13. Pravim method="POST" v login i register

14. Add user model s mongoose
    - pravim go s mongoose UserSchema

15. Pravim papka services s funciite
    - ei tva v services da ne se zabravq exports.register = (userData) => User.create(userData); (userDatata)

16. Check if the password missmatch
userSchema.virtual("repassword").set(function (value) {
  console.log({ value });
  if (value !== this.password) {
    throw new Error("Password missmatch!");
  }
});

17. Hash password with bcrypt v User Schemata

18. Login - find user by email, validate password with hash

19. Generate jsonwebtoken
    - promisify jsonwebtoken
      - pravim papka lib/jwt.js
      -
    - generate SECRET
    - generate token in service login 
    - SLED KATO NAPRAVIM JSONWEBTOKEN-a trqbva da testvame dali se vrushta token-a s console.log
  
20. cookie-parser (predvaritelno sme go installnali ili sega go installvame se taq)
  - exportvame go v index.js i s app.use(cookieParser()); go podavame na express configa
  - v userControllera na login go podavame res.cookie("token", token, { httpOnly: true });

21. Implement logout
  - v userControllera 
  router.get("/logout", (req, res) => {
  res.clearCookie("token");
  res.redirect("/");
});

22. Pravim authentication middleware
  - v papka middlewares/authMiddleware.js pishem logikata
  - exportvame go v index.js

23. Dynamic navigation to check if the user is logged in (one kind of menu, if is not other..)
  - pravim if elsove v main.hbs sled kato sme naglasili auth middleware-a

24. Optimizirame page 404
  - naglasqme q v router-a i homeController-a

25. Show error notification (error handling)
  - pravim papka utils/errorHandler.js i pishem logikata za greshkata
  - posle implementirame v userController za login, register i tam za kvoto iskame
  - v main.hbs pravim ili tursim div s greshkite i mu slagame #each errorMessages ili kakto sme si krustili const-a

26. Pravim avtomatichno sled kato se regnem da ni loginva v stranicata (ako go ima po uslovie ama dano da go nqma) (mega tupo i me drazni)

27. postController, postService i router.js za da napravim routovete da vodqt do catalog i create
28. Pravim Post.js v papka models s iziskvaniqta, koito sa ni nujni tam desc, name i dr
29. Pravim logikata za router.create v postController i funkciite v postService
  - Opravqme method="POST" i names v create.hbs !!!

30. Na kartinkite v catalog-a im maham tochkite na linkovete za da rabotqt

31. Catalog page was edited with {{each i dr za da raboti pravilno}}
  - Za da se pokazvat novite produkti, koito creatnahme trqbva da opravim v postController-a funkciqta za get catalog ili all posts tam..

32. Details page (kak da access-nem)
  - Pravim router.get("/:postId/details", async (req, res) => { v postControllera
  - pravim funkciq v postService - exports.singlePost = (postId) => Post.findById(postId);
  - opravqme linka v catalog.hbs <a href="/posts/{{_id}}/details" class="added-electronics-in-market"> 

33. Details page (buy, edit i delete da gi imame samo ako sme owneri)
  - samo v details.hbs opravqme hbs ezika (shte go cheknem v repoto)

34. Edit button
  - opravqme putq v postController router.get, router.post
  - pravim si funkciqta v postService
  - opravqme method="POST", name i value v edit.hbs
  - opravqme putq go edit.hbs v details.hbs

35. Delete button
  - pishem si funkciika v postService
  - exportvame si q v postController-a
  - opravqme si putq v details.hbs

36. Buy button da ne se vijda ako usera e owner (prosto mu smenqme mestata)

37. BuyingList functionality 
  - purvo v Post modela opravqme buyingList da e array bratle
  - funkciq v services
  - route v controllera
  - opravqme linkovete v details.hbs i bi trqbvalo da raboti vsi4ko BRATLE

38. Search functionality
  - funkciq v servica s if else proverka
  - search.hbs opravqme name i method="GET"
  - router v postController.js

39. Ako ima profile page kato bonus 2ra lekciq exam prep 1:21:43

40. Route guards i proverkite 34:52



