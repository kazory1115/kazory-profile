<template>
  <div class="restaurant-app">
    <!-- 首頁 Header -->
    <header class="header">
      <div class="logo-container">
        <div class="logo">R</div>
        <div class="welcome">歡迎點餐：桌號 A01</div>
      </div>
    </header>

    <!-- 菜單分類 tabs -->
    <div class="tabs">
      <div
        v-for="(category, index) in categories"
        :key="index"
        class="tab"
        :class="{ active: currentCategory === category }"
        @click="currentCategory = category"
      >
        {{ category }}
      </div>
    </div>

    <!-- 商品卡片清單 -->
    <div class="menu-container">
      <div
        v-for="(item, index) in filteredMenuItems"
        :key="index"
        class="menu-item"
      >
        <div class="item-image">{{ item.emoji }}</div>
        <div class="item-info">
          <div class="item-name">{{ item.name }}</div>
          <div class="item-price">NT$ {{ item.price }}</div>
          <div class="item-quantity">
            <button
              class="quantity-btn"
              @click="decreaseQuantity(item)"
              :disabled="item.quantity <= 0"
            >
              -
            </button>
            <span>{{ item.quantity }}</span>
            <button class="quantity-btn add" @click="increaseQuantity(item)">
              +
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- 底部固定欄 -->
    <button class="cart-btn" @click="showOrderSuccess = true">
      🛒 查看購物車 ({{ totalItems }})
    </button>

    <!-- 訂單成功彈窗 -->
    <div class="order-success" :class="{ show: showOrderSuccess }">
      <div class="success-content">
        <div class="success-icon">✅</div>
        <div class="success-message">訂單送出成功，請稍候片刻上菜 🍽️</div>
        <button class="close-btn" @click="closeSuccessModal">確定</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'RestaurantOrderingApp',
  data() {
    return {
      categories: ['飲品', '主餐', '小吃'],
      currentCategory: '飲品',
      showOrderSuccess: false,
      menuItems: [
        // 飲品
        {
          name: '珍珠奶茶',
          price: 60,
          category: '飲品',
          quantity: 0,
          emoji: '🧋',
        },
        {
          name: '水果茶',
          price: 80,
          category: '飲品',
          quantity: 0,
          emoji: '🍹',
        },
        {
          name: '美式咖啡',
          price: 70,
          category: '飲品',
          quantity: 0,
          emoji: '☕',
        },
        { name: '可樂', price: 40, category: '飲品', quantity: 0, emoji: '🥤' },
        {
          name: '鮮奶茶',
          price: 65,
          category: '飲品',
          quantity: 0,
          emoji: '🥛',
        },
        { name: '綠茶', price: 45, category: '飲品', quantity: 0, emoji: '🍵' },

        // 主餐
        {
          name: '牛肉漢堡',
          price: 120,
          category: '主餐',
          quantity: 0,
          emoji: '🍔',
        },
        {
          name: '義大利麵',
          price: 150,
          category: '主餐',
          quantity: 0,
          emoji: '🍝',
        },
        {
          name: '炒飯',
          price: 110,
          category: '主餐',
          quantity: 0,
          emoji: '🍚',
        },
        {
          name: '披薩',
          price: 180,
          category: '主餐',
          quantity: 0,
          emoji: '🍕',
        },
        {
          name: '牛排',
          price: 250,
          category: '主餐',
          quantity: 0,
          emoji: '🥩',
        },

        // 小吃
        { name: '薯條', price: 60, category: '小吃', quantity: 0, emoji: '🍟' },
        { name: '雞塊', price: 70, category: '小吃', quantity: 0, emoji: '🍗' },
        {
          name: '洋蔥圈',
          price: 65,
          category: '小吃',
          quantity: 0,
          emoji: '⭕',
        },
        { name: '沙拉', price: 80, category: '小吃', quantity: 0, emoji: '🥗' },
      ],
    };
  },
  computed: {
    filteredMenuItems() {
      return this.menuItems.filter(
        (item) => item.category === this.currentCategory
      );
    },
    totalItems() {
      return this.menuItems.reduce((total, item) => total + item.quantity, 0);
    },
  },
  methods: {
    increaseQuantity(item) {
      item.quantity++;
    },
    decreaseQuantity(item) {
      if (item.quantity > 0) {
        item.quantity--;
      }
    },
    closeSuccessModal() {
      this.showOrderSuccess = false;
      // 可以在這裡加入重置訂單的邏輯
    },
  },
};
</script>

<style scoped>
:root {
  --primary: #f9a825;
  --light-primary: #fff3e0;
  --text-color: #3e2723;
  --button-color: #ff7043;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: 'Helvetica Neue', Arial, sans-serif;
}

.restaurant-app {
  background-color: #fff3e0;
  position: relative;
  min-height: 100vh;
  padding-bottom: 80px;
  color: #3e2723;
}

.header {
  background-color: #f9a825;
  padding: 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.logo-container {
  display: flex;
  align-items: center;
}

.logo {
  width: 50px;
  height: 50px;
  background-color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size: 20px;
  margin-right: 10px;
}

.welcome {
  font-size: 16px;
  font-weight: bold;
}

.tabs {
  display: flex;
  background-color: white;
  padding: 0 16px;
  border-bottom: 1px solid #eee;
  position: sticky;
  top: 0;
  z-index: 10;
}

.tab {
  padding: 16px;
  font-weight: bold;
  position: relative;
  cursor: pointer;
}

.tab.active {
  color: #f9a825;
}

.tab.active:after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 3px;
  background-color: #f9a825;
}

.menu-container {
  padding: 16px;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
  gap: 16px;
}

.menu-item {
  background-color: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s;
}

.menu-item:hover {
  transform: translateY(-4px);
}

.item-image {
  width: 100%;
  height: 120px;
  background-color: #f5f5f5;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 48px;
}

.item-info {
  padding: 12px;
}

.item-name {
  font-weight: bold;
  margin-bottom: 4px;
}

.item-price {
  color: #f9a825;
  font-weight: bold;
  margin-bottom: 8px;
}

.item-quantity {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.quantity-btn {
  width: 28px;
  height: 28px;
  border-radius: 50%;
  border: none;
  background-color: #fff3e0;
  color: #3e2723;
  font-size: 16px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
}

.quantity-btn.add {
  background-color: #ff7043;
  color: white;
}

.quantity-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.cart-btn {
  position: fixed;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  background-color: #ff7043;
  color: white;
  border: none;
  border-radius: 24px;
  padding: 12px 24px;
  font-size: 16px;
  font-weight: bold;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  cursor: pointer;
  z-index: 100;
}

.order-success {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 200;
  opacity: 0;
  visibility: hidden;
  transition: opacity 0.3s, visibility 0.3s;
}

.order-success.show {
  opacity: 1;
  visibility: visible;
}

.success-content {
  background-color: white;
  border-radius: 8px;
  padding: 32px;
  text-align: center;
  max-width: 80%;
}

.success-icon {
  font-size: 48px;
  margin-bottom: 16px;
}

.success-message {
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 24px;
}

.close-btn {
  background-color: #f9a825;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 8px 16px;
  font-weight: bold;
  cursor: pointer;
}
</style>
