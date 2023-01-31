const express = require('express');
const server = express();
const cors = require('cors');
const fileUpload = require('express-fileupload');


const getUser = require('./handlers/getUser');
const cookieParser = require('cookie-parser');
const logout = require('./handlers/logout');
const logIn = require('./handlers/logIn');
const getAllProducts = require('./handlers/getAllProducts');
const authenticate = require('./handlers/middleWares/authenticate');
const addProduct = require('./handlers/addProduct');
const getMyProducts = require('./handlers/getMyProducts');
const getArtistProducts = require('./handlers/getArtistProducts');
const deleteProduct = require('./handlers/deleteProduct');
const addToFavourites = require('./handlers/addToFavourites');
const getMyFavourites = require('./handlers/getMyFavourites');
const removeFromFavourites = require('./handlers/removeFromFavourites');
const getProductByID = require('./handlers/getProductByID');
const isFavourite = require('./handlers/isFavourtie');
const updateProduct = require('./handlers/updateProduct');
const updateUser = require('./handlers/updateUser');
const deleteUser = require('./handlers/deleteUser');
const getArtistByName = require('./handlers/getArtistByName');
const forgotPassword = require('./handlers/forgotPassword');
const getAccessToResetPassword = require('./handlers/getAccessToResetPassword');
const resetPassword = require('./handlers/resetPassword');
const register = require('./handlers/register');
const authenticateArtist = require('./handlers/middleWares/authenticateArtist');
const getFullUserByID = require('./handlers/getFullUserByID');
const saveImage = require('./handlers/saveImage');




server.use(express.json());
server.use(cookieParser());
server.use(cors({
    credentials: true,
    origin: ['http://localhost:4200']
}));
server.use(fileUpload({
    limits: {
        fileSize: 50 * 1024 * 1024
    }
}));




server.get('/user', authenticate, getUser);
server.get('/full-user-by-id', authenticate, getFullUserByID);
server.get('/artist-by-name', authenticate, getArtistByName);
server.post('/login', logIn);
server.put('/update-user', authenticate, updateUser);
server.delete('/delete-user', authenticate, deleteUser);
server.post('/forgot-password', forgotPassword);
server.get('/reset-password/:id/:token', getAccessToResetPassword);
server.post('/reset-password/:id/:token', resetPassword);


server.post('/register', register);

server.delete('/logout', logout);

server.get('/products', authenticate, getAllProducts);
server.get('/products/my-products', authenticateArtist, getMyProducts);
server.get('/products/artist-products', authenticate, getArtistProducts);
server.post('/products/add', authenticateArtist, addProduct);
server.delete('/products/delete-one', authenticateArtist, deleteProduct);
server.put('/products/update', authenticateArtist, updateProduct);
server.get('/products/my-favourites', authenticate, getMyFavourites);
server.post('/products/add-to-favourites', authenticate, addToFavourites, getMyFavourites);
server.delete('/products/remove-from-favourites', authenticate, removeFromFavourites, getMyFavourites);
server.get('/products/get-product-by-id', authenticate, getProductByID);
server.get('/products/is-favourite', authenticate, isFavourite);
server.post('/save-image', authenticateArtist, saveImage);




server.listen(3000, () => console.log('Server is Listening at port 3000'));