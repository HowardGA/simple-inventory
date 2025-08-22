export const validateProduct = (product) => {
    const { itemName, itemDescription, itemPrice, itemStock, categoryId, itemImage } = product;
    if (!itemName || !itemDescription || !itemPrice || !itemStock || !categoryId || !itemImage) {
        throw new Error('Todos los campos son obligatorios');
    }
    if (typeof itemPrice !== 'number' || itemPrice <= 0) {
        throw new Error('El precio debe ser un numero positivo');
    }
    if (typeof itemStock !== 'number' || itemStock < 0) {
        throw new Error('El stock debe ser un numero no negativo');
    }
    return ({ itemName, itemDescription, itemPrice, itemStock, categoryId, itemImage });
}

export const validateUser = (user) => {
    const { name, email, password } = user;
    if (!name || !email || !password) {
        throw new Error('Todos los campos son obligatorios');
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
        throw new Error('Email no valido');
    }
    if (password.length < 6) {
        throw new Error('La contraseña debe tener al menos 6 caracteres');
    }
    return { name, email, password };
}

export const validateCategory = (category) => {
    const { name } = category;
    if (!name) {
        throw new Error('El nombre de la categoría es obligatorio');
    }
    return { name };
}

export const validateLogin = (credentials) => {
    const { email, password } = credentials;
    if (!email || !password) {
        throw new Error('Email y contraseña son obligatorios');
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
        throw new Error('Email no valido');
    }
    return { email, password };
}