<template>
    <div class="dp_flex gap_30">
        <!-- Start Category -->
        <div class="flex_2 sticky-sidebar">
            <div class="box dp_block">
                <div class="box_section mg_b10">
                    <div class="box_inner">
                        <span class="box_title_sm"> Mục Lục </span>
                    </div>
                </div>
                <div>
                    <nav class="menu">
                        <a class="link-item" href="#section1">Cơm tự chọn</a>
                        <a class="link-item" href="#section2">Cơm tự chọn</a>
                        <a class="link-item" href="#section3">Cơm tự chọn</a>
                        <a class="link-item" href="#section4">Cơm tự chọn</a>
                        <a class="link-item" href="#section5">Cơm tự chọn</a>
                        <a class="link-item" href="#section6">Cơm tự chọn</a>
                        <a class="link-item" href="#section6">Cơm tự chọn</a>
                        <a class="link-item" href="#section6">Cơm tự chọn</a>
                        <a class="link-item" href="#section6">Cơm tự chọn</a>
                        <a class="link-item" href="#section6">Cơm tự chọn</a>
                        <a class="link-item" href="#section6">Cơm tự chọn</a>
                    </nav>
                </div>
                <!-- <div class="no_cnt" id="section14">
                        <p>Không có dữ liệu</p>
                    </div> -->
            </div>
        </div>
        <!-- End Category -->

        <!-- Start Product -->
        <div class="flex_5">
            <div class="box dp_block">
                <div class="box_section mg_b10">
                    <div class="box_inner">
                        <span class="box_title_sm"> Danh sách sản phẩm </span>
                    </div>
                    <div class="search-container mg_b25 mt_5">
                        <span class="search-icon">&#128269;</span>
                        <input type="text" class="search-input" placeholder="Tìm kiếm..." />
                    </div>
                </div>
                <div class="box_section mg_b20" v-for="(a, index) in 3">
                    <div class="box_inner" id="section1">
                        <span class="box_title_xs font_gray">
                            <text>{{ index + 1 }}. Cơm Tự Chọn</text>
                        </span>
                    </div>
                    <div class="product-card" v-for="item in 3">
                        <div class="product-image">
                            <img src="https://recipe1.ezmember.co.kr/cache/recipe/2018/07/29/52046ea43391de69233f594b0b52bb311.JPG"
                                alt="Product Image" />
                        </div>
                        <div class="product-info">
                            <h3 class="product-name">Sản phẩm {{ item }}</h3>
                            <p class="product-description">
                                Mô tả ngắn gọn của sản phẩm, bao gồm hương vị hoặc đặc điểm nổi
                                bật.
                            </p>
                            <div class="product-footer">
                                <div class="price-container">
                                    <span class="original-price">70.000₫</span>
                                    <span class="product-price">50.000₫</span>
                                </div>
                                <div class="dp_flex gap_10">
                                    <BaseCounter v-model="quantity" :min="1" :max="10" />
                                    <button class="add-to-cart">Thêm</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- <div class="no_cnt" id="section14">
                        <p>Không có dữ liệu</p>
                    </div> -->
            </div>
        </div>
        <!-- End Product -->

        <!-- Start Order -->
        <div class="flex_3 sticky-sidebar">
            <div class="box dp_block">
                <!-- <div class="box_section mg_b10">
                        <div class="box_inner">
                            <span class="box_title_xs"> Hóa đơn </span>
                        </div>
                    </div> -->
                <div class="mg_b35">
                    <div>
                        <div class="box_title_sm">Sản phẩm được chọn</div>
                    </div>
                    <hr />
                    <div class="menu">
                        <div class="order_custom mg_b10" v-for="item in 6">
                            <button type="button" class="btn_icon icon_only closePre wd_15"></button>
                            <div>
                                <a href="#section6" class="link-item mg_0">Sản phẩm {{ item }}: 50.000₫
                                </a>
                            </div>
                            <BaseCounter v-model="quantity" :min="1" :max="10" />
                        </div>
                    </div>
                </div>
                <hr />
                <div class="dp_flex al_center jc_between mg_b35">
                    <div class="bold">Thành Tiền</div>
                    <div class="product-price">100.000.000₫</div>
                </div>

                <div class="btn_group btn_end">
                    <button @click="openViewOrderFood()" type="button" class="button btn_sm btn_white">
                        Quay lại
                    </button>
                    <button type="button" class="button btn_sm btn_blue">Đặt Hàng</button>
                </div>
                <!-- <div class="no_cnt" id="section14">
                        <p>Không có dữ liệu</p>
                    </div> -->
            </div>
        </div>
        <!-- End Order -->
    </div>
</template>
<script setup lang="ts">
const props = defineProps({
    modalOpen: {
        type: Boolean,
        default: false,
    },
    closeModal: {
        type: Function,
        required: true,
    },
    openModal: {
        type: Function,
        required: true,
    },
});

const dataFake = ref([
    {
        id: 1,
        quantity: 1,
    },
    {
        id: 1,
        quantity: 1,
    },
    {
        id: 1,
        quantity: 1,
    },
    {
        id: 1,
        quantity: 1,
    },
    {
        id: 1,
        quantity: 1,
    },
    {
        id: 1,
        quantity: 1,
    },
    {
        id: 1,
        quantity: 1,
    },
]);

const openViewOrderFood = () => {
    props.openModal(0);
    props.closeModal(5);
};

</script>
<style scoped>
.sticky-sidebar {
    position: sticky;
    top: calc(4rem + 50px);
    align-self: start;
}

.menu {
    counter-reset: menu-counter;
    max-height: 400px;
    overflow-y: auto;
}

.link-item {
    display: block;
    font-size: 13px;
    color: gray;
    text-decoration: none;
    position: relative;
    margin-bottom: 10px;
}

.link-item:hover {
    text-decoration: underline;
}

.link-item::before {
    counter-increment: menu-counter;
    content: counter(menu-counter) ". ";
    color: gray;
    margin-right: 8px;
    position: absolute;
    left: 0;
}

.menu .link-item {
    padding-left: 20px;
}

/* Card container */
.product-card {
    display: flex;
    background-color: #fff;
    overflow: hidden;
    margin: 15px auto;
}

/* Image section */
.product-image {
    flex: 0 0 120px;
    overflow: hidden;
}

.product-image img {
    width: 100%;
    object-fit: cover;
}

/* Info section */
.product-info {
    flex: 1;
    padding: 10px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}

/* Product name */
.product-name {
    font-size: 15px;
    font-weight: bold;
    margin: 0;
    color: #333;
    cursor: pointer;
}

/* Product description */
.product-description {
    font-size: 14px;
    color: #666;
    margin: 5px 0 10px;
    line-height: 1.4;
}

/* Footer with price and button */
.product-footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

/* Giá gốc (đã bị gạch ngang) */
.original-price {
    font-size: 14px;
    color: #999;
    text-decoration: line-through;
    margin-right: 10px;
}

/* Giá giảm */
.product-price {
    font-size: 16px;
    font-weight: bold;
    color: var(--primary);
}

.add-to-cart {
    background-color: var(--primary);
    color: white;
    border: none;
    border-radius: 4px;
    padding: 5px 10px;
    font-size: 14px;
    cursor: pointer;
    transition: background-color 0.3s ease;
}

.save-to-cart {
    background-color: var(--yellow);
    color: white;
    border: none;
    border-radius: 4px;
    padding: 5px 10px;
    font-size: 14px;
    cursor: pointer;
    transition: background-color 0.3s ease;
}

/* Container */
.search-container {
    width: 100%;
    margin: 0 auto;
    position: relative;
}

/* Icon tìm kiếm */
.search-icon {
    position: absolute;
    top: 50%;
    left: 15px;
    transform: translateY(-50%);
    font-size: 18px;
    color: #aaa;
    pointer-events: none;
}

/* Input */
.search-input {
    width: 100%;
    padding: 10px 15px 10px 40px;
    border: 1px solid #ccc;
    border-radius: 20px;
    font-size: 14px;
    outline: none;
    transition: border-color 0.3s ease;
}

/* Focus effect */
.search-input:focus {
    border-color: #007bff;
    box-shadow: 0 0 5px rgba(0, 123, 255, 0.5);
}

.order_custom {
    display: grid;
    grid-template-columns: 10% 65% 20%;
    align-items: center;
}
</style>
