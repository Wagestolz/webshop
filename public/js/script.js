(function () {
    Vue.component('about-component', {
        template: '#about-template',
        data: function () {
            return {};
        },
        mounted: function () {
            console.log('About component mounted');
        },
        methods: {},
    });

    Vue.component('all-products-component', {
        template: '#all-products-template',
        props: ['clickId'],
        data: function () {
            return {
                products: [],
                searchInput: '',
                brands: [],
                maxPrice: null,
                minPrice: null,
                searchPrice: null,
            };
        },
        mounted: function () {
            console.log('Products component mounted');
            this.getProducts();
        },
        methods: {
            getProducts: function () {
                var self = this;
                axios
                    .get('/products')
                    .then(function (res) {
                        self.products = res.data;
                        for (let i = 0; i < self.products.length; i++) {
                            if (
                                !self.brands.includes(
                                    self.products[i].fields.brand
                                )
                            ) {
                                self.brands.push(self.products[i].fields.brand);
                            }
                        }
                        self.maxPrice =
                            Math.max(
                                ...self.products.map(
                                    (item) => item.fields.price
                                )
                            ) + 0.01;
                        self.searchPrice = self.maxPrice - 0.01;
                        self.minPrice = Math.min(
                            ...self.products.map((item) => item.fields.price)
                        );
                    })
                    .catch(function (error) {
                        console.log('error at GET /products', error);
                    });
            },
            addToCart: function (id) {
                this.$emit('cart-addition', id);
            },
            searchFilter: function () {
                var self = this;
                if (this.searchInput.length == 0) {
                    this.getProducts();
                } else {
                    axios
                        .get('/search', {
                            params: { searchInput: this.searchInput },
                        })
                        .then(function (res) {
                            self.products = res.data;
                        })
                        .catch(function (error) {
                            console.log('error at GET /search', error);
                        });
                }
            },
            getBrandProducts: function (brand) {
                var self = this;
                axios
                    .get('/brands', {
                        params: {
                            brand: brand,
                        },
                    })
                    .then(function (res) {
                        self.products = res.data;
                    })
                    .catch(function (error) {
                        console.log('error at GET /brands', error);
                    });
            },
            priceInputChange: function (e) {
                this.searchPrice = e.target.value;
                var self = this;
                axios
                    .get('/price', {
                        params: {
                            price: e.target.value,
                        },
                    })
                    .then(function (res) {
                        self.products = res.data;
                    })
                    .catch(function (error) {
                        console.log('error at GET /price', error);
                    });
            },
        },
    });

    Vue.component('product-component', {
        template: '#product-template',
        props: ['clickId'],
        data: function () {
            return {
                product: [
                    {
                        id: '',
                        fields: {
                            name: '',
                            price: '',
                            brand: '',
                            fabric: '',
                            url: '',
                            colors: [],
                            tags: [],
                            featured: '',
                            description: '',
                            image: [
                                {
                                    url: '',
                                },
                            ],
                        },
                    },
                ],
                empty: false,
                mounted: false,
            };
        },
        watch: {
            clickId: 'getProduct',
        },
        mounted: function () {
            console.log('Product Modal mounted');
            this.getProduct();
        },
        methods: {
            getProduct: function () {
                var self = this;
                axios
                    .get(`/product/:${this.clickId}`, {
                        params: { productId: this.clickId },
                    })
                    .then(function (res) {
                        if (res.data.length > 0) {
                            self.product = res.data;
                            mounted = true;
                        } else {
                            self.empty = true;
                            console.log('empty selection');
                        }
                    })
                    .catch(function (error) {
                        console.log('error at GET /products/:productId', error);
                    });
            },
            closeProduct: function () {
                this.$emit('close');
            },
            addProductToCart: function (id) {
                this.$emit('cart-addition', id);
            },
        },
    });

    Vue.component('home-component', {
        template: '#home-template',
        props: ['home'],
        data: function () {
            // data is a function for component (own data set)
            return {
                featuredProducts: [],
                product: false,
            };
        },
        mounted: function () {
            console.log('Home component mounted');
            this.getFeaturedProducts();
        },
        methods: {
            getFeaturedProducts: function () {
                var self = this;
                axios
                    .get('/featured')
                    .then(function (res) {
                        self.featuredProducts = res.data;
                    })
                    .catch(function (error) {
                        console.log('error at GET /featured', error);
                    });
            },
            addToCart: function (id) {
                console.log('add to Cart fired for id: ', id);
                this.$emit('cart-addition', id);
            },
            FireNavProducts: function () {
                this.$emit('all-products');
            },
        },
    });

    new Vue({
        el: '#main',
        data: {
            toggleActive: false,
            cartToggleActive: false,
            featuredProducts: [],
            home: false,
            about: false,
            products: true,
            clickId: location.hash.slice(1),
            cart: [],
            total: 0,
            cartCount: 0,
        },
        mounted: function () {
            var self = this;
            addEventListener('hashchange', function () {
                self.clickId = location.hash.slice(1); // for openProduct
            });
            let storageItem = JSON.parse(localStorage.getItem('cart'));
            if (storageItem) {
                this.cart = storageItem;
            }
            this.cartValue();
        },
        methods: {
            toggleNav: function () {
                if (!this.toggleActive) {
                    this.toggleActive = true;
                } else {
                    this.toggleActive = false;
                }
            },
            toggleCart: function () {
                if (!this.cartToggleActive) {
                    this.cartToggleActive = true;
                } else {
                    this.cartToggleActive = false;
                }
            },
            closeMe: function () {
                this.clickId = null;
                history.pushState({}, '', '/'); // reset link
            },
            addItemToCart: function (id) {
                var self = this;
                let item = self.cart.find((cartItem) => cartItem.id === id);
                if (!item) {
                    axios
                        .get(`/product/:${id}`, {
                            params: { productId: id },
                        })
                        .then(function (res) {
                            if (res.data.length > 0) {
                                let product = { ...res.data[0], amount: 1 };
                                self.cart.push(product);
                                localStorage.setItem(
                                    'cart',
                                    JSON.stringify(self.cart)
                                );
                                self.cartValue();
                                self.toggleCart();
                            } else {
                                self.empty = true;
                                console.log('empty selection');
                            }
                        })
                        .catch(function (error) {
                            console.log(
                                'error at GET /products/:productId',
                                error
                            );
                        });
                } else {
                    // console.log('item already in card: ', item);
                    let index = self.cart.findIndex(
                        (cartItem) => cartItem.id === id
                    );
                    self.cart[index].amount += 1;
                    localStorage.setItem('cart', JSON.stringify(self.cart));
                    self.cartValue();
                    self.toggleCart();
                }
            },
            removeItem: function (id, index) {
                this.cart.splice(index, 1);
                localStorage.setItem('cart', JSON.stringify(this.cart));
            },
            cartValue: function () {
                var self = this;
                this.total = 0;
                this.cartCount = 0;
                for (let i = 0; i < this.cart.length; i++) {
                    let itemTotal =
                        this.cart[i].fields.price * this.cart[i].amount;
                    this.total += itemTotal;
                    this.total =
                        Math.round((this.total + Number.EPSILON) * 100) / 100;
                    this.cartCount += this.cart[i].amount;
                }
            },
            increaseAmount: function (index, id) {
                this.cart[index].amount += 1;
                this.cartValue();
                localStorage.setItem('cart', JSON.stringify(this.cart));
            },
            decreaseAmount: function (index, id) {
                if (this.cart[index].amount > 1) {
                    this.cart[index].amount -= 1;
                    this.cartValue();
                    localStorage.setItem('cart', JSON.stringify(this.cart));
                } else {
                    this.removeItem(id, index);
                    this.cartValue();
                    localStorage.setItem('cart', JSON.stringify(this.cart));
                }
            },
            navHome: function () {
                this.home = true;
                this.products = false;
                this.about = false;
            },
            navProducts: function () {
                this.products = true;
                this.home = false;
                this.about = false;
            },
            navAbout: function () {
                this.about = true;
                this.products = false;
                this.home = false;
            },
        },
    });
})();
