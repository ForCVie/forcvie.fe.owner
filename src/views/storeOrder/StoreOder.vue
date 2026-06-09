<template>
  <div class="flex-1 flex flex-col h-full overflow-hidden relative bg-[#f4f7f9] w-full">

    <!-- ================= VIEW 1: MÁY POS (GỌI MÓN) ================= -->
    <main v-show="activeTab === 'pos'" class="flex-1 overflow-hidden flex flex-col relative w-full">
      
      <!-- Thanh Tabs Hóa Đơn (Đang mở) -->
      <div class="h-[54px] bg-[#e2e8f0] flex items-end px-2 sm:px-3 gap-1 sm:gap-1.5 shrink-0 overflow-x-auto pt-2 pb-1 shadow-inner border-b border-gray-300 custom-scroll-x" id="invoiceTabs">
        <div 
          v-for="inv in invoices" :key="inv.id" 
          @click="switchInvoice(inv.id)" 
          class="flex items-center justify-between px-3 sm:px-4 py-1.5 sm:py-2 min-w-[120px] sm:min-w-[160px] max-w-[180px] sm:max-w-[200px] h-full shrink-0 transition-colors group"
          :class="inv.id === currentInvoiceId ? 'bg-white text-orange-600 border-t-2 border-t-orange-500 border-x border-gray-200 z-10 rounded-t-lg shadow-[0_-2px_4px_rgba(0,0,0,0.02)]' : 'bg-gray-100 text-gray-600 border-t-2 border-t-transparent border-x border-transparent hover:bg-gray-50 rounded-t-lg cursor-pointer mt-1 opacity-70 hover:opacity-100'"
        >
          <div class="flex flex-col min-w-0 pr-2">
            <span class="text-[11px] sm:text-xs font-bold truncate" :class="{'text-gray-900': inv.id === currentInvoiceId}">
              {{ inv.tables.length > 0 ? `Bàn ${inv.tables.join(', ')}` : 'Mang đi / Mới' }}
            </span>
            <span class="text-[9px] sm:text-[10px] truncate" :class="{'text-gray-500': inv.id === currentInvoiceId}">{{ inv.id }}</span>
          </div>
          <button @click.stop="confirmCloseInvoice(inv.id)" class="w-5 h-5 sm:w-6 sm:h-6 rounded-full hover:bg-red-50 hover:text-red-500 flex items-center justify-center text-gray-400 transition-colors shrink-0">
            <i class="ph ph-x font-bold text-[10px] sm:text-xs"></i>
          </button>
        </div>
        
        <button @click="createNewInvoice" class="w-8 h-8 sm:w-10 sm:h-9 mt-auto mb-0.5 ml-1 rounded-lg bg-gray-100 border border-gray-300 hover:bg-white hover:border-orange-300 hover:text-orange-500 flex items-center justify-center text-gray-500 transition-all shrink-0 tooltip shadow-sm">
          <i class="ph ph-plus font-bold text-base sm:text-lg"></i>
        </button>
      </div>

      <!-- Khu vực Hoạt động POS (Menu Trái + Giỏ Phải) -->
      <div class="flex-1 flex flex-col lg:flex-row overflow-hidden relative w-full">
        
        <!-- Khu vực Menu (Trái) -->
        <div class="flex-1 flex flex-col overflow-hidden pb-20 lg:pb-0 w-full">
          <!-- Filter Bar -->
          <div class="p-4 sm:p-6 pb-3 sm:pb-4 shrink-0 border-b border-gray-200 bg-white z-10 shadow-[0_4px_20px_-10px_rgba(0,0,0,0.05)]">
            <div class="flex items-center justify-between gap-4 mb-3 sm:mb-4">
              <div class="relative flex-1 max-w-md">
                <i class="ph ph-magnifying-glass absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 text-gray-400 text-base sm:text-lg"></i>
                <input v-model="searchQuery" type="text" placeholder="Tìm kiếm món ăn..." class="w-full bg-gray-50 border border-transparent focus:bg-white focus:border-orange-300 focus:ring-2 focus:ring-orange-100 rounded-xl py-2.5 sm:py-3 pl-10 sm:pl-11 pr-4 text-xs sm:text-sm outline-none transition-all">
              </div>
            </div>
            
            <!-- Category Scroll -->
            <div class="flex gap-2 overflow-x-auto hide-scrollbar -mx-4 px-4 sm:mx-0 sm:px-0 custom-scroll-x">
              <button 
                v-for="cat in categories" :key="cat"
                @click="activeCategory = cat" 
                class="px-4 sm:px-5 py-1.5 sm:py-2 font-medium rounded-xl text-xs sm:text-sm whitespace-nowrap transition-colors"
                :class="activeCategory === cat ? 'bg-gray-900 text-white shadow-sm' : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'"
              >
                {{ cat }}
              </button>
            </div>
          </div>

          <!-- Menu Grid -->
          <div class="flex-1 overflow-y-auto p-4 sm:p-6 custom-scrollbar">
            <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-5">
              <div 
                v-for="item in filteredMenu" :key="item.id" 
                @click="addToCart(item)" 
                class="item-card bg-white rounded-xl sm:rounded-2xl border border-gray-200 overflow-hidden cursor-pointer hover:border-orange-500 hover:shadow-md transition-all flex flex-col group select-none"
              >
                <div class="h-24 sm:h-32 w-full overflow-hidden">
                  <img :src="item.img" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500">
                </div>
                <div class="p-2 sm:p-3 flex-1 flex flex-col">
                  <p class="text-[10px] sm:text-xs text-gray-500 mb-0.5 sm:mb-1 line-clamp-1">{{ item.category }}</p>
                  <h4 class="font-bold text-gray-900 text-xs sm:text-sm leading-tight mb-1 sm:mb-2 line-clamp-2">{{ item.name }}</h4>
                  <p class="font-bold text-orange-600 mt-auto text-xs sm:text-sm">{{ formatMoney(item.price) }}</p>
                </div>
              </div>
            </div>
          </div>

          <!-- NÚT GIỎ HÀNG NỔI (CHỈ HIỂN THỊ TRÊN MOBILE) -->
          <div class="lg:hidden absolute bottom-4 left-4 right-4 z-20">
            <button @click="isMobileCartOpen = true" class="w-full bg-orange-500 text-white rounded-2xl p-4 shadow-[0_8px_30px_rgba(255,92,0,0.4)] flex justify-between items-center font-bold">
              <div class="flex items-center gap-3">
                <div class="bg-white/20 p-2 rounded-lg relative">
                  <i class="ph-fill ph-receipt text-xl"></i>
                  <span class="absolute -top-2 -right-2 bg-white text-orange-600 w-5 h-5 rounded-full flex items-center justify-center text-[10px] shadow-sm transition-transform" :class="{'scale-150 bg-yellow-300': cartBumping}">
                    {{ cartTotalItems }}
                  </span>
                </div>
                <span class="text-sm">Xem Hóa Đơn</span>
              </div>
              <span class="text-lg">{{ formatMoney(cartTotalAmount) }}</span>
            </button>
          </div>
        </div>

        <!-- CART OVERLAY (Mobile) -->
        <transition name="fade">
          <div v-if="isMobileCartOpen" @click="isMobileCartOpen = false" class="fixed inset-0 bg-gray-900/60 z-40 lg:hidden backdrop-blur-sm"></div>
        </transition>

        <!-- Khu vực Giỏ Hàng / Hóa Đơn Chi Tiết (Phải) -->
        <div class="fixed lg:static inset-y-0 right-0 w-[90%] sm:w-[400px] lg:w-[420px] bg-white lg:border-l border-gray-200 flex flex-col shadow-2xl lg:shadow-[-4px_0_24px_rgba(0,0,0,0.02)] z-50 lg:z-20 shrink-0 transform transition-transform duration-300 ease-in-out"
             :class="isMobileCartOpen ? 'translate-x-0' : 'translate-x-full lg:translate-x-0'">
          
          <!-- Mobile Close Button -->
          <div class="lg:hidden px-4 py-3 border-b border-gray-100 bg-gray-50 flex justify-between items-center shrink-0">
            <h3 class="font-bold text-gray-900">Chi tiết Hóa đơn</h3>
            <button @click="isMobileCartOpen = false" class="w-8 h-8 rounded-full bg-white border border-gray-200 text-gray-500 flex items-center justify-center hover:text-orange-500"><i class="ph ph-x"></i></button>
          </div>

          <!-- THÔNG TIN HÓA ĐƠN CHI TIẾT -->
          <div v-if="currentInvoice" class="p-3 sm:p-4 border-b border-gray-100 bg-white shrink-0 flex flex-col gap-2 sm:gap-3 relative z-10 shadow-sm">
            
            <!-- Siêu dữ liệu Bill -->
            <div class="flex justify-between items-center text-xs text-gray-500 px-1">
              <span class="font-mono font-bold text-gray-800 bg-gray-100 px-2 py-0.5 rounded">#{{ currentInvoice.id }}</span>
              <span class="flex items-center gap-1"><i class="ph ph-clock"></i> {{ currentTime }} • {{ currentDate }}</span>
            </div>

            <!-- Chọn Bàn & Khách hàng -->
            <div class="flex gap-2">
              <button @click="openTableSelectModal" class="flex-1 min-w-0 w-1/2 bg-gray-50 border border-gray-200 hover:border-orange-500 rounded-lg p-2 flex items-center gap-2 transition-colors group">
                <div class="w-7 h-7 sm:w-8 sm:h-8 rounded-md bg-orange-100 text-orange-600 flex items-center justify-center font-bold group-hover:bg-orange-500 group-hover:text-white transition-colors shrink-0">
                  <i class="ph-fill ph-armchair text-sm"></i>
                </div>
                <div class="text-left min-w-0 flex-1">
                  <p class="text-[9px] sm:text-[10px] text-gray-500 font-bold uppercase truncate leading-tight">Bàn phục vụ</p>
                  <h3 class="font-bold text-xs sm:text-sm leading-none mt-1 truncate transition-colors" :class="currentInvoice.tables.length > 0 ? 'text-orange-600' : 'text-gray-900'">
                    {{ currentInvoice.tables.length > 0 ? currentInvoice.tables.join(', ') : 'Chọn bàn' }}
                  </h3>
                  <p v-if="currentInvoice.tables.length > 0" class="text-[9px] sm:text-[10px] text-gray-500 mt-1 truncate">
                    {{ getTableDetailsText(currentInvoice.tables) }}
                  </p>
                </div>
              </button>

              <div @click="isCustomerModalOpen = true" class="flex-1 min-w-0 w-1/2 bg-gray-50 border border-gray-200 rounded-lg p-2 flex items-center gap-2 cursor-pointer hover:border-orange-300 transition-colors group">
                <div class="w-7 h-7 sm:w-8 sm:h-8 rounded-md bg-blue-50 text-blue-600 flex items-center justify-center font-bold group-hover:bg-blue-500 group-hover:text-white transition-colors shrink-0">
                  <i class="ph-fill ph-user text-sm"></i>
                </div>
                <div class="text-left min-w-0 flex-1">
                  <p class="text-[9px] sm:text-[10px] text-gray-500 font-bold uppercase truncate leading-tight">Khách hàng</p>
                  <h3 class="font-bold text-gray-900 text-xs sm:text-sm leading-none mt-1 truncate transition-colors">{{ currentInvoice.customerName }}</h3>
                </div>
              </div>
            </div>

            <!-- Quick Tools Bar -->
            <div class="flex justify-between items-center text-xs pt-2 mt-1 border-t border-gray-50 px-1">
              <div class="flex items-center gap-1.5 text-gray-500">
                <i class="ph-fill ph-user-circle text-gray-400"></i> Phục vụ: <span class="font-medium text-gray-700">Admin</span>
              </div>
              <div class="flex items-center gap-2 sm:gap-3">
                <button class="text-gray-400 hover:text-orange-500 transition-colors flex items-center gap-1 font-medium"><i class="ph ph-note-pencil text-base"></i> <span class="hidden sm:inline">Ghi chú</span></button>
                <button class="text-gray-400 hover:text-blue-500 transition-colors flex items-center gap-1 font-medium"><i class="ph ph-arrows-split text-base"></i> <span class="hidden sm:inline">Tách</span></button>
                <button @click="confirmCloseInvoice()" class="text-gray-400 hover:text-red-500 transition-colors tooltip" title="Hủy hóa đơn"><i class="ph ph-trash text-base"></i></button>
              </div>
            </div>
          </div>

          <!-- Khu vực Món đã gọi -->
          <div class="flex-1 overflow-y-auto p-3 sm:p-4 custom-scrollbar bg-gray-50/30" ref="cartContainerRef">
            <div v-if="!currentInvoice || currentInvoice.items.length === 0" class="h-full flex flex-col items-center justify-center text-gray-400">
              <i class="ph ph-receipt text-4xl sm:text-5xl mb-2 text-gray-300 block"></i>
              <p class="text-xs sm:text-sm font-medium">Hóa đơn trống</p>
            </div>
            
            <div v-else>
              <div v-for="cItem in currentInvoice.items" :key="cItem.cartItemId" 
                   class="flex items-start gap-2 sm:gap-3 bg-white p-2 sm:p-3 rounded-xl border relative mb-2.5 transition-colors cart-item-enter"
                   :class="getCartItemBorderClass(cItem.status)">
                
                <div class="flex flex-col items-center border border-gray-200 rounded-lg overflow-hidden shrink-0 bg-white">
                  <button @click="updateCartQty(cItem, 1)" class="w-6 h-6 sm:w-8 sm:h-7 bg-gray-50 hover:bg-gray-100 text-gray-600 flex items-center justify-center"><i class="ph ph-plus font-bold text-[10px] sm:text-xs"></i></button>
                  <div class="w-6 h-6 sm:w-8 sm:h-8 flex items-center justify-center font-bold text-gray-900 border-y border-gray-200 text-xs sm:text-sm">{{ cItem.qty }}</div>
                  <button @click="updateCartQty(cItem, -1)" class="w-6 h-6 sm:w-8 sm:h-7 bg-gray-50 hover:bg-gray-100 text-gray-600 flex items-center justify-center">
                    <i class="ph font-bold text-[10px] sm:text-xs" :class="cItem.qty === 1 && cItem.status === 'new' ? 'ph-trash text-red-500' : 'ph-minus'"></i>
                  </button>
                </div>
                
                <img :src="cItem.item.img" class="w-10 h-10 sm:w-12 sm:h-12 rounded-lg object-cover border border-gray-100 shrink-0" :class="{'grayscale opacity-60': cItem.status === 'served'}">
                
                <div class="flex-1 min-w-0">
                  <div class="flex items-center gap-1 sm:gap-1.5 flex-wrap mb-1">
                    <h4 class="font-bold text-xs sm:text-sm line-clamp-1 leading-tight" :class="cItem.status === 'served' ? 'text-gray-400 line-through' : 'text-gray-900'">{{ cItem.item.name }}</h4>
                    <span v-html="getCartItemBadge(cItem.status)"></span>
                  </div>
                  <input v-model="cItem.note" type="text" placeholder="Ghi chú (ít đá...)" class="text-[10px] sm:text-[11px] border-b border-dashed border-gray-200 outline-none w-full mt-0.5 bg-transparent text-gray-600 focus:border-orange-500 placeholder-gray-300 italic">
                </div>
                
                <div class="shrink-0 text-right w-16 sm:w-20">
                  <div class="font-bold text-xs sm:text-sm whitespace-nowrap pt-0.5" :class="cItem.status === 'served' ? 'text-gray-400' : 'text-orange-600'">
                    {{ formatMoney(cItem.item.price * cItem.qty) }}
                  </div>
                  <button v-if="cItem.status === 'sent'" @click="markServed(cItem)" class="mt-1.5 sm:mt-2 text-[9px] sm:text-[10px] font-bold text-green-600 bg-green-50 border border-green-200 px-1 sm:px-2 py-1 rounded hover:bg-green-500 hover:text-white transition-colors flex items-center justify-center w-full gap-1">
                    <i class="ph ph-check-circle"></i> Trả
                  </button>
                  <button v-else-if="cItem.status === 'served'" @click="markServed(cItem)" class="mt-1.5 sm:mt-2 text-[9px] sm:text-[10px] font-bold text-gray-400 hover:text-orange-500 transition-colors flex items-center justify-center w-full gap-1">
                    <i class="ph-fill ph-check-circle text-green-500"></i> Đủ
                  </button>
                </div>
              </div>
            </div>
          </div>

          <!-- TỔNG CỘNG VÀ THANH TOÁN -->
          <div class="p-3 sm:p-4 border-t border-gray-200 bg-white shrink-0 shadow-[0_-10px_20px_rgba(0,0,0,0.02)] relative z-10">
            <div class="space-y-1.5 mb-3 border-b border-gray-100 pb-3">
              <div class="flex justify-between text-xs sm:text-[13px] text-gray-500">
                <span>Tạm tính (<span>{{ cartTotalItems }}</span> món)</span>
                <span class="font-medium text-gray-900">{{ formatMoney(cartSubtotal) }}</span>
              </div>
              <div class="flex justify-between text-xs sm:text-[13px] text-gray-500">
                <span class="flex items-center gap-1 cursor-pointer text-blue-500 hover:text-blue-700 transition-colors"><i class="ph ph-tag"></i> Thêm Chiết khấu</span>
                <span class="font-medium text-gray-900">-0đ</span>
              </div>
              <div class="flex justify-between text-xs sm:text-[13px] text-gray-500">
                <span class="flex items-center gap-1 cursor-pointer hover:text-gray-700 transition-colors"><i class="ph ph-receipt"></i> Thuế VAT (8%)</span>
                <span class="font-medium text-gray-900">{{ formatMoney(cartVat) }}</span>
              </div>
            </div>

            <div class="flex justify-between items-end mb-3 sm:mb-4">
              <span class="font-bold text-gray-900 text-sm sm:text-base uppercase tracking-wider">Khách cần trả</span>
              <span class="font-bold text-orange-600 text-xl sm:text-2xl leading-none">{{ formatMoney(cartTotalAmount) }}</span>
            </div>

            <div class="flex gap-2">
              <button @click="saveOrder" class="flex-1 py-2 sm:py-2.5 bg-blue-50 text-blue-600 rounded-xl font-bold hover:bg-blue-100 border border-blue-200 transition-colors flex items-center justify-center gap-2 text-xs sm:text-sm">
                <i class="ph ph-printer text-lg"></i> Báo Bếp
              </button>
              <button @click="openCheckoutModal" class="flex-1 py-2 sm:py-2.5 bg-orange-500 text-white rounded-xl font-bold hover:bg-orange-600 transition-colors shadow-sm shadow-orange-500/30 flex items-center justify-center gap-2 text-xs sm:text-sm">
                <i class="ph ph-wallet text-lg"></i> Thanh toán
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>

    <!-- ================= VIEW 2: DANH SÁCH ĐẶT CHỖ ================= -->
    <main v-show="activeTab === 'reservations'" class="flex-1 overflow-y-auto p-4 sm:p-8 custom-scrollbar bg-[#f4f7f9] w-full">
      <div class="flex flex-col sm:flex-row sm:justify-between sm:items-end gap-4 mb-6">
        <div>
          <h2 class="text-xl sm:text-2xl font-bold text-gray-900">Danh sách Đặt bàn sắp tới</h2>
          <p class="text-xs sm:text-sm text-gray-500 mt-1">Theo dõi khách hàng đã đặt chỗ trước qua Website hoặc Hotline.</p>
        </div>
        <div class="flex items-center gap-2 sm:gap-3 w-full sm:w-auto">
          <div class="relative flex-1 sm:flex-none">
            <i class="ph ph-calendar-blank absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"></i>
            <input type="text" value="Hôm nay, 24/10/2023" class="bg-white border border-gray-200 rounded-xl pl-9 pr-4 py-2 text-xs sm:text-sm font-medium outline-none focus:border-orange-500 w-full sm:w-48 cursor-pointer" readonly>
          </div>
          <button class="bg-gray-900 text-white px-3 sm:px-4 py-2 rounded-xl font-medium hover:bg-gray-800 transition-colors flex items-center justify-center gap-2 text-xs sm:text-sm shrink-0">
            <i class="ph ph-plus"></i> <span class="hidden sm:inline">Thêm Booking</span>
          </button>
        </div>
      </div>

      <div class="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden w-full">
        <div class="overflow-x-auto w-full hide-scrollbar">
          <table class="w-full text-left border-collapse min-w-[800px]">
            <thead>
              <tr class="bg-white border-b border-gray-100 text-[11px] font-bold uppercase tracking-wider text-gray-400">
                <th class="px-4 sm:px-6 py-4">Giờ đến</th>
                <th class="px-4 sm:px-6 py-4">Khách hàng</th>
                <th class="px-4 sm:px-6 py-4">Bàn / Khách</th>
                <th class="px-4 sm:px-6 py-4">Tiền cọc</th>
                <th class="px-4 sm:px-6 py-4">Trạng thái</th>
                <th class="px-4 sm:px-6 py-4 text-right">Thao tác</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-100">
              <tr v-for="res in mockReservations" :key="res.tableName" class="hover:bg-gray-50 transition-colors">
                <td class="px-4 sm:px-6 py-4">
                  <div class="font-bold text-gray-900 text-base sm:text-lg">{{ res.time }}</div>
                  <div class="text-[10px] sm:text-xs text-orange-500 font-medium">Hôm nay</div>
                </td>
                <td class="px-4 sm:px-6 py-4">
                  <div class="font-bold text-gray-900 text-sm sm:text-base">{{ res.customerName }}</div>
                  <div class="text-xs sm:text-sm text-gray-500">090.123.4567</div>
                </td>
                <td class="px-4 sm:px-6 py-4">
                  <div class="flex items-center gap-2 mb-1">
                    <span class="bg-gray-100 text-gray-800 px-2 py-0.5 rounded text-[10px] sm:text-xs font-bold border border-gray-200">Bàn {{ res.tableName }}</span>
                  </div>
                  <div class="text-[10px] sm:text-[11px] text-gray-500 font-medium mb-0.5">{{ tableDetailsData[res.tableName]?.type }} &bull; {{ tableDetailsData[res.tableName]?.capacity }} ghế</div>
                  <div class="text-xs sm:text-sm text-gray-700 flex items-center gap-1"><i class="ph-fill ph-users text-gray-400"></i> Khách đặt: 4</div>
                </td>
                <td class="px-4 sm:px-6 py-4">
                  <span class="text-green-600 font-medium bg-green-50 px-2 sm:px-2.5 py-1 rounded-lg text-[10px] sm:text-xs border border-green-100 inline-flex items-center gap-1"><i class="ph-fill ph-check-circle"></i> Đã cọc 800k</span>
                </td>
                <td class="px-4 sm:px-6 py-4">
                  <span class="text-blue-600 border border-blue-200 px-2 sm:px-3 py-1 rounded-full text-[10px] sm:text-xs font-bold bg-white whitespace-nowrap">Chờ khách đến</span>
                </td>
                <td class="px-4 sm:px-6 py-4 text-right">
                  <button @click="checkInReservation(res)" class="bg-orange-500 text-white px-3 sm:px-5 py-1.5 sm:py-2 rounded-lg text-xs sm:text-sm font-bold hover:bg-orange-600 shadow-sm transition-colors shadow-orange-500/30 whitespace-nowrap">
                    Nhận bàn
                  </button>
                </td>
              </tr>
              <tr v-if="mockReservations.length === 0">
                <td colspan="6" class="text-center py-10 text-gray-500">Không có đặt bàn nào.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </main>

    <!-- ================= MODALS ================= -->

    <!-- Modal Chọn Bàn Động -->
    <transition name="fade">
      <div v-if="isTableModalOpen" class="fixed inset-0 bg-gray-900/60 backdrop-blur-sm z-[100] flex items-end sm:items-center justify-center sm:p-4">
        <div class="bg-white rounded-t-3xl sm:rounded-3xl w-full max-w-4xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh] sm:h-[80vh]" @click.stop>
          <div class="px-4 sm:px-6 py-3 sm:py-4 border-b border-gray-100 flex justify-between items-center bg-gray-50/50 shrink-0">
            <h3 class="text-lg sm:text-xl font-bold text-gray-900">Mở bill / Chọn bàn <span class="hidden sm:inline text-sm font-normal text-gray-500 ml-2">(Có thể chọn nhiều bàn)</span></h3>
            <button @click="isTableModalOpen = false" class="w-8 h-8 rounded-full hover:bg-gray-200 flex items-center justify-center text-gray-500 transition-colors">
              <i class="ph ph-x text-lg"></i>
            </button>
          </div>
          
          <div class="p-4 sm:p-6 overflow-y-auto flex-1 bg-[#f4f7f9] custom-scrollbar">
            <div class="flex gap-2 mb-4 sm:mb-6 border-b border-gray-200 pb-3 sm:pb-4 overflow-x-auto hide-scrollbar -mx-4 px-4 sm:mx-0 sm:px-0 custom-scroll-x">
              <button class="px-4 py-2 bg-gray-900 text-white rounded-xl text-xs sm:text-sm font-medium whitespace-nowrap shrink-0">Tất cả</button>
              <button class="px-4 py-2 bg-white text-gray-600 border border-gray-200 hover:border-orange-500 rounded-xl text-xs sm:text-sm font-medium transition-colors whitespace-nowrap shrink-0">Tầng 1</button>
              <button class="px-4 py-2 bg-white text-gray-600 border border-gray-200 hover:border-orange-500 rounded-xl text-xs sm:text-sm font-medium transition-colors whitespace-nowrap shrink-0">Tầng 2</button>
              <button class="px-4 py-2 bg-white text-gray-600 border border-gray-200 hover:border-orange-500 rounded-xl text-xs sm:text-sm font-medium transition-colors whitespace-nowrap shrink-0">Phòng VIP</button>
            </div>
            
            <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4">
              <div 
                v-for="tableName in allTableNames" :key="tableName"
                @click="toggleTableSelection(tableName)"
                class="p-2 sm:p-3 rounded-2xl border-2 cursor-pointer transition-all shadow-sm text-center relative group min-h-[100px] sm:min-h-[130px] flex flex-col items-center justify-center"
                :class="getTableModalClass(tableName)"
              >
                <div v-html="getTableModalIcon(tableName)"></div>
                <h4 class="font-bold text-gray-900 text-sm sm:text-base leading-none mt-1 truncate px-1">{{ tableName }}</h4>
                <p class="text-[9px] sm:text-[11px] text-gray-500 font-medium mt-1 mb-0.5 opacity-90 truncate w-full text-center px-1">
                  {{ tableDetailsData[tableName]?.type || 'Chưa rõ' }} &bull; <i class="ph-fill ph-users"></i> {{ tableDetailsData[tableName]?.capacity || 0 }}
                </p>
                <div v-html="getTableModalText(tableName)"></div>
              </div>
            </div>
          </div>
          
          <div class="px-4 sm:px-6 py-3 sm:py-4 border-t border-gray-100 bg-white flex justify-between items-center shrink-0">
            <div class="text-xs sm:text-sm text-gray-600">Đã chọn: <strong class="text-orange-600">{{ modalSelectedTables.length }}</strong> bàn</div>
            <div class="flex gap-2 sm:gap-3">
              <button @click="isTableModalOpen = false" class="px-4 sm:px-5 py-2 sm:py-2.5 bg-gray-100 text-gray-700 rounded-xl font-medium hover:bg-gray-200 transition-colors text-sm">Hủy</button>
              <button @click="confirmTableSelection" class="px-4 sm:px-6 py-2 sm:py-2.5 bg-orange-500 text-white rounded-xl font-bold hover:bg-orange-600 transition-colors shadow-sm shadow-orange-500/30 text-sm">
                Gán Bàn
              </button>
            </div>
          </div>
        </div>
      </div>
    </transition>

    <!-- Modal Khách Hàng -->
    <transition name="fade">
      <div v-if="isCustomerModalOpen" class="fixed inset-0 bg-gray-900/60 backdrop-blur-sm z-[100] flex items-end sm:items-center justify-center sm:p-4">
        <div class="bg-white rounded-t-3xl sm:rounded-3xl w-full max-w-md shadow-2xl overflow-hidden flex flex-col max-h-[90vh]" @click.stop>
          <div class="px-4 sm:px-6 py-3 sm:py-4 border-b border-gray-100 flex justify-between items-center bg-gray-50/50 shrink-0">
            <h3 class="text-lg sm:text-xl font-bold text-gray-900">Thông tin Khách hàng</h3>
            <button @click="isCustomerModalOpen = false" class="w-8 h-8 rounded-full hover:bg-gray-200 flex items-center justify-center text-gray-500 transition-colors">
              <i class="ph ph-x text-lg"></i>
            </button>
          </div>
          
          <div class="p-4 sm:p-6 flex flex-col gap-4 sm:gap-5 overflow-y-auto custom-scrollbar">
            <div class="relative">
              <i class="ph ph-magnifying-glass absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-lg"></i>
              <input v-model="customerSearchQuery" type="text" placeholder="Tìm theo tên hoặc số điện thoại..." class="w-full bg-gray-50 border border-gray-200 focus:bg-white focus:border-orange-500 focus:ring-2 focus:ring-orange-100 rounded-xl py-3 pl-11 pr-4 text-sm outline-none transition-all">
            </div>

            <div class="border border-dashed border-orange-300 rounded-xl p-4 bg-orange-50/30 flex flex-col gap-3">
              <p class="text-xs font-bold text-orange-600 uppercase tracking-wider flex items-center gap-1"><i class="ph-fill ph-plus-circle"></i> Hoặc thêm mới nhanh</p>
              <div class="flex flex-col gap-2">
                <input v-model="newCustomerName" type="text" placeholder="Tên khách hàng" class="w-full bg-white border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-orange-500">
                <input v-model="newCustomerPhone" type="tel" placeholder="Số điện thoại" class="w-full bg-white border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-orange-500">
              </div>
              <button @click="quickAddCustomer" class="w-full bg-orange-100 text-orange-700 hover:bg-orange-500 hover:text-white font-bold py-2 rounded-lg transition-colors text-sm mt-1">
                Lưu & Chọn khách này
              </button>
            </div>

            <div class="border-t border-gray-100"></div>

            <div class="flex flex-col gap-2 max-h-48 overflow-y-auto custom-scrollbar">
              <div 
                v-for="c in filteredCustomers" :key="c.id" 
                @click="selectCustomer(c.name)" 
                class="flex items-center justify-between p-3 border border-gray-100 rounded-xl hover:border-orange-300 hover:bg-orange-50 cursor-pointer transition-colors group"
              >
                <div class="flex items-center gap-3">
                  <div class="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gray-100 text-gray-500 flex items-center justify-center font-bold uppercase group-hover:bg-orange-200 group-hover:text-orange-600 transition-colors">
                    {{ c.name.charAt(0) }}
                  </div>
                  <div>
                    <p class="font-bold text-gray-900 text-xs sm:text-sm">{{ c.name }}</p>
                    <p v-if="c.phone" class="text-[10px] sm:text-xs text-gray-500 font-medium">{{ c.phone }}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </transition>

    <!-- Modal Thanh Toán -->
    <transition name="fade">
      <div v-if="isCheckoutModalOpen" class="fixed inset-0 bg-gray-900/60 backdrop-blur-sm z-[100] flex items-end sm:items-center justify-center sm:p-4">
        <div class="bg-white rounded-t-3xl sm:rounded-3xl w-full max-w-md shadow-2xl overflow-hidden flex flex-col max-h-[90vh]" @click.stop>
          <div class="px-4 sm:px-6 py-3 sm:py-4 border-b border-gray-100 flex justify-between items-center bg-gray-50/50 shrink-0">
            <h3 class="text-lg sm:text-xl font-bold text-gray-900">Thanh toán Hóa đơn</h3>
            <button @click="isCheckoutModalOpen = false" class="w-8 h-8 rounded-full hover:bg-gray-200 flex items-center justify-center text-gray-500 transition-colors">
              <i class="ph ph-x text-lg"></i>
            </button>
          </div>
          
          <div class="p-4 sm:p-6 flex flex-col gap-4 sm:gap-5 overflow-y-auto custom-scrollbar">
            <div class="text-center">
              <p class="text-sm text-gray-500 mb-1">Khách cần trả</p>
              <p class="text-3xl sm:text-4xl font-bold text-orange-600">{{ formatMoney(cartTotalAmount) }}</p>
            </div>

            <div class="border-t border-gray-100"></div>

            <div>
              <p class="text-sm font-bold text-gray-900 mb-3">Phương thức thanh toán</p>
              <div class="grid grid-cols-2 gap-3">
                <button 
                  @click="paymentMethod = 'cash'" 
                  class="p-3 sm:p-4 rounded-xl border-2 flex flex-col items-center gap-2 transition-all"
                  :class="paymentMethod === 'cash' ? 'border-orange-500 bg-orange-50 text-orange-700' : 'border-gray-200 bg-white text-gray-600 hover:border-orange-300 hover:bg-orange-50'"
                >
                  <i class="ph ph-money text-2xl sm:text-3xl"></i>
                  <span class="font-semibold text-xs sm:text-sm">Tiền mặt</span>
                </button>
                <button 
                  @click="paymentMethod = 'transfer'" 
                  class="p-3 sm:p-4 rounded-xl border-2 flex flex-col items-center gap-2 transition-all"
                  :class="paymentMethod === 'transfer' ? 'border-orange-500 bg-orange-50 text-orange-700' : 'border-gray-200 bg-white text-gray-600 hover:border-orange-300 hover:bg-orange-50'"
                >
                  <i class="ph ph-bank text-2xl sm:text-3xl"></i>
                  <span class="font-semibold text-xs sm:text-sm">Chuyển khoản</span>
                </button>
              </div>
            </div>
          </div>
          
          <div class="px-4 sm:px-6 py-3 sm:py-4 border-t border-gray-100 bg-gray-50/50 flex justify-end gap-2 sm:gap-3 shrink-0">
            <button @click="isCheckoutModalOpen = false" class="px-4 sm:px-5 py-2 sm:py-2.5 bg-white border border-gray-200 text-gray-700 rounded-xl font-medium hover:bg-gray-50 transition-colors text-sm">Hủy</button>
            <button @click="confirmPayment" class="px-4 sm:px-5 py-2 sm:py-2.5 bg-orange-500 text-white rounded-xl font-bold hover:bg-orange-600 transition-colors shadow-sm shadow-orange-500/30 flex items-center gap-2 text-sm">
              <i class="ph ph-check-circle text-lg"></i> Hoàn tất
            </button>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted, onUnmounted, nextTick } from 'vue';

// --- DATA CƠ BẢN ---
const activeTab = ref('pos'); // Giả lập tab đang mở ('pos' hoặc 'reservations')

const currentTime = ref('');
const currentDate = ref('');
let timeInterval = null;

const formatMoney = (amount) => new Intl.NumberFormat('vi-VN').format(amount) + 'đ';
const generateInvoiceId = () => 'ORD-' + Math.floor(10000 + Math.random() * 90000);

// --- MENU POS ---
const menuItems = ref([
  { id: 1, name: 'Ribeye Steak Úc (300g)', category: 'Món chính', price: 850000, img: 'https://images.unsplash.com/photo-1600891964092-4316c288032e?auto=format&fit=crop&w=200&q=80' },
  { id: 2, name: 'Mì Ý Truffle Hải Sản', category: 'Món chính', price: 320000, img: 'https://images.unsplash.com/photo-1563379926898-05f4575a45d8?auto=format&fit=crop&w=200&q=80' },
  { id: 3, name: 'Salad Cá Hồi Xông Khói', category: 'Khai vị', price: 210000, img: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=200&q=80' },
  { id: 4, name: 'Súp Nấm Truffle', category: 'Khai vị', price: 150000, img: 'https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=200&q=80' },
  { id: 5, name: 'Vang Đỏ Chile Cabernet', category: 'Đồ uống', price: 1200000, img: 'https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?auto=format&fit=crop&w=200&q=80' },
  { id: 6, name: 'Tiramisu truyền thống', category: 'Tráng miệng', price: 120000, img: 'https://images.unsplash.com/photo-1571115177098-24ec42ed204d?auto=format&fit=crop&w=200&q=80' },
  { id: 7, name: 'Hàu nướng phô mai', category: 'Khai vị', price: 180000, img: 'https://images.unsplash.com/photo-1599084993091-1cb5c0721cc6?auto=format&fit=crop&w=200&q=80' },
  { id: 8, name: 'Nước suối Dasani', category: 'Đồ uống', price: 20000, img: 'https://images.unsplash.com/photo-1559839914-11aaeae9ce3d?auto=format&fit=crop&w=200&q=80' }
]);

const categories = ['All', 'Món chính', 'Khai vị', 'Đồ uống', 'Tráng miệng'];
const activeCategory = ref('All');
const searchQuery = ref('');

const filteredMenu = computed(() => {
  let list = menuItems.value;
  if (activeCategory.value !== 'All') {
    list = list.filter(i => i.category === activeCategory.value);
  }
  if (searchQuery.value) {
    const q = searchQuery.value.toLowerCase();
    list = list.filter(i => i.name.toLowerCase().includes(q));
  }
  return list;
});

// --- INVOICE & CART ---
const invoices = ref([
  {
    id: 'ORD-10452',
    tables: ['T1-02'],
    customerName: 'Khách vãng lai',
    items: [
      { cartItemId: 'c1', item: menuItems.value[0], qty: 1, note: 'Chín vừa', status: 'sent' }, 
      { cartItemId: 'c2', item: menuItems.value[1], qty: 2, note: '', status: 'served' }
    ]
  }
]);
const currentInvoiceId = ref('ORD-10452');
const isMobileCartOpen = ref(false);
const cartBumping = ref(false);
const cartContainerRef = ref(null);

const currentInvoice = computed(() => invoices.value.find(i => i.id === currentInvoiceId.value));

// Cart Totals
const cartTotalItems = computed(() => currentInvoice.value?.items.reduce((sum, item) => sum + item.qty, 0) || 0);
const cartSubtotal = computed(() => currentInvoice.value?.items.reduce((sum, c) => sum + (c.item.price * c.qty), 0) || 0);
const cartVat = computed(() => cartSubtotal.value * 0.08);
const cartTotalAmount = computed(() => cartSubtotal.value + cartVat.value + (cartSubtotal.value * 0.05)); // VAT + 5% Phí PV

const switchInvoice = (id) => { currentInvoiceId.value = id; };

const createNewInvoice = () => {
  const newInv = { id: generateInvoiceId(), tables: [], customerName: 'Khách vãng lai', items: [] };
  invoices.value.push(newInv);
  currentInvoiceId.value = newInv.id;
  nextTick(() => {
    const el = document.getElementById('invoiceTabs');
    if (el) el.scrollTo({ left: el.scrollWidth, behavior: 'smooth' });
  });
};

const confirmCloseInvoice = (idToClose = currentInvoiceId.value) => {
  const inv = invoices.value.find(i => i.id === idToClose);
  if (!inv) return;
  if (inv.items.length > 0 && !confirm(`Hóa đơn ${inv.id} đang có món. Bạn có chắc chắn muốn HỦY không?`)) return;

  invoices.value = invoices.value.filter(i => i.id !== idToClose);
  if (invoices.value.length === 0) {
    createNewInvoice();
  } else if (currentInvoiceId.value === idToClose) {
    currentInvoiceId.value = invoices.value[invoices.value.length - 1].id;
  }
};

const addToCart = (item) => {
  if (!currentInvoice.value) return;
  const cart = currentInvoice.value.items;
  const existing = cart.find(c => c.item.id === item.id && c.status === 'new');
  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({ cartItemId: 'id_' + Date.now(), item, qty: 1, note: '', status: 'new' });
  }

  nextTick(() => {
    if (cartContainerRef.value) {
      cartContainerRef.value.scrollTop = cartContainerRef.value.scrollHeight;
    }
  });

  if (window.innerWidth < 1024 && !isMobileCartOpen.value) {
    cartBumping.value = true;
    setTimeout(() => cartBumping.value = false, 200);
  }
};

const updateCartQty = (cartItem, delta) => {
  if (cartItem.status !== 'new' && delta > 0) {
    addToCart(cartItem.item);
    return;
  }
  if (cartItem.status !== 'new' && delta < 0) {
    if(!confirm("Món này đã gửi Bếp. Bạn có chắc chắn muốn giảm số lượng hoặc hủy món?")) return;
  }
  
  cartItem.qty += delta;
  if (cartItem.qty <= 0) {
    currentInvoice.value.items = currentInvoice.value.items.filter(i => i.cartItemId !== cartItem.cartItemId);
  }
};

const markServed = (cartItem) => {
  cartItem.status = cartItem.status === 'served' ? 'sent' : 'served';
};

const getCartItemBorderClass = (status) => {
  if (status === 'new') return 'border-blue-200 shadow-sm';
  if (status === 'sent') return 'border-orange-200 shadow-sm';
  return 'border-gray-100 opacity-70';
};
const getCartItemBadge = (status) => {
  if (status === 'new') return '<span class="bg-blue-50 text-blue-600 px-1.5 py-0.5 rounded text-[8px] sm:text-[9px] font-bold border border-blue-100">MỚI</span>';
  if (status === 'sent') return '<span class="bg-orange-50 text-orange-600 px-1.5 py-0.5 rounded text-[8px] sm:text-[9px] font-bold border border-orange-100">ĐANG LÀM</span>';
  return '<span class="bg-green-50 text-green-600 px-1.5 py-0.5 rounded text-[8px] sm:text-[9px] font-bold border border-green-100">ĐÃ LÊN</span>';
};

const saveOrder = () => {
  if (!currentInvoice.value || currentInvoice.value.items.length === 0) {
    return alert('Hóa đơn trống!');
  }
  let hasNew = false;
  currentInvoice.value.items.forEach(c => {
    if (c.status === 'new') { c.status = 'sent'; hasNew = true; }
  });
  if (!hasNew) return alert('Không có món MỚI nào để in phiếu Bếp!');
  if (window.innerWidth < 1024) isMobileCartOpen.value = false;
  alert('Đã báo món thành công!');
};

// --- CHỌN BÀN GÁN CHO HÓA ĐƠN ---
const isTableModalOpen = ref(false);
const allTableNames = ['T1-01', 'T1-02', 'T1-03', 'T1-04', 'VIP-1', 'VIP-2', 'B2-01', 'B2-02'];
const tableDetailsData = {
  'T1-01': { type: 'Bàn Vuông', capacity: 4 }, 'T1-02': { type: 'Bàn Tròn', capacity: 2 },
  'T1-03': { type: 'Sofa', capacity: 6 }, 'T1-04': { type: 'Bàn Vuông', capacity: 4 },
  'VIP-1': { type: 'Bàn VIP', capacity: 12 }, 'VIP-2': { type: 'Bàn VIP', capacity: 10 },
  'B2-01': { type: 'Ngoài trời', capacity: 2 }, 'B2-02': { type: 'Ngoài trời', capacity: 4 }
};
const modalSelectedTables = ref([]);

const openTableSelectModal = () => {
  modalSelectedTables.value = [...(currentInvoice.value?.tables || [])];
  isTableModalOpen.value = true;
};

const getTableDetailsText = (tableNames) => {
  let totalCap = 0; let types = new Set();
  tableNames.forEach(t => {
    if(tableDetailsData[t]) {
      totalCap += tableDetailsData[t].capacity;
      types.add(tableDetailsData[t].type);
    }
  });
  const typeStr = Array.from(types).join(', ');
  if (totalCap > 0) return `${typeStr} • ${totalCap} ghế`;
  if (typeStr) return typeStr;
  return 'Chưa xác định sức chứa';
};

const toggleTableSelection = (tableName) => {
  const res = mockReservations.value.find(r => r.tableName === tableName);
  const index = modalSelectedTables.value.indexOf(tableName);

  if (index > -1) {
    if (currentInvoice.value.items.length > 0) {
      const msg = modalSelectedTables.value.length > 1 
        ? `Bạn đang tách bàn [${tableName}] ra khỏi hóa đơn này. Xác nhận?` 
        : `Hóa đơn này đang có món. Bỏ chọn bàn duy nhất đồng nghĩa với việc giữ hóa đơn này ở dạng Mang đi/Takeaway. Tiếp tục?`;
      if (!confirm(msg)) return;
    }
    modalSelectedTables.value.splice(index, 1);
  } else {
    const otherInvoices = invoices.value.filter(inv => inv.id !== currentInvoiceId.value && inv.tables.includes(tableName));
    if (otherInvoices.length > 0) {
      if (!confirm(`Bàn [${tableName}] đang có khách.\nBạn có chắc chắn muốn XẾP NGỒI CHUNG BÀN không?`)) return;
    } else if (res) {
      if (!confirm(`Bàn [${tableName}] đã đặt trước. Bạn có chắc chắn muốn mở bàn này không?`)) return;
    }
    modalSelectedTables.value.push(tableName);
  }
};

const confirmTableSelection = () => {
  if (currentInvoice.value) {
    currentInvoice.value.tables = [...modalSelectedTables.value].sort();
  }
  isTableModalOpen.value = false;
};

// UI logic for Table Select Modal cells
const getTableModalClass = (tableName) => {
  const isSelected = modalSelectedTables.value.includes(tableName);
  const otherInvoices = invoices.value.filter(inv => inv.id !== currentInvoiceId.value && inv.tables.includes(tableName));
  const isReserved = mockReservations.value.some(r => r.tableName === tableName) && otherInvoices.length === 0 && !isSelected;

  if (isSelected) return "ring-2 sm:ring-4 ring-orange-500 border-transparent bg-orange-100 z-10 scale-105";
  if (otherInvoices.length > 0) return "border-orange-300 bg-orange-50/70 hover:bg-orange-100";
  if (isReserved) return "border-blue-300 bg-blue-50/70 hover:bg-blue-100";
  return "border-gray-200 bg-white hover:border-green-500 hover:bg-green-50";
};

const getTableModalIcon = (tableName) => {
  const isSelected = modalSelectedTables.value.includes(tableName);
  const otherInvoices = invoices.value.filter(inv => inv.id !== currentInvoiceId.value && inv.tables.includes(tableName));
  const isReserved = mockReservations.value.some(r => r.tableName === tableName) && otherInvoices.length === 0 && !isSelected;

  if (isSelected) return `<div class="w-5 h-5 sm:w-6 sm:h-6 absolute -top-2 -right-2 rounded-full bg-orange-500 text-white flex items-center justify-center text-xs sm:text-sm shadow-md"><i class="ph-fill ph-check-circle"></i></div><div class="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-orange-200 text-orange-600 flex items-center justify-center text-base sm:text-lg mb-1"><i class="ph-fill ph-armchair"></i></div>`;
  if (otherInvoices.length > 0) return `<div class="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-orange-200 text-orange-600 flex items-center justify-center text-base sm:text-lg mb-1"><i class="ph-fill ph-clock"></i></div>`;
  if (isReserved) return `<div class="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-blue-200 text-blue-600 flex items-center justify-center text-base sm:text-lg mb-1"><i class="ph-fill ph-calendar-check"></i></div>`;
  return `<div class="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-green-50 text-green-500 flex items-center justify-center text-base sm:text-lg mb-1 group-hover:bg-green-500 group-hover:text-white transition-colors"><i class="ph-fill ph-check-circle"></i></div>`;
};

const getTableModalText = (tableName) => {
  const isSelected = modalSelectedTables.value.includes(tableName);
  const otherInvoices = invoices.value.filter(inv => inv.id !== currentInvoiceId.value && inv.tables.includes(tableName));
  const reservation = mockReservations.value.find(r => r.tableName === tableName);
  const isReserved = !!reservation && otherInvoices.length === 0 && !isSelected;

  if (isSelected) return `<span class="inline-block bg-orange-200 text-orange-700 text-[9px] sm:text-[10px] font-bold px-1.5 sm:px-2 py-0.5 rounded mt-1">Đang chọn${otherInvoices.length > 0 ? ' (Chung)' : ''}</span>`;
  if (otherInvoices.length > 0) {
    let invText = otherInvoices.length > 1 ? `${otherInvoices.length} HĐ` : otherInvoices[0].id;
    return `<div class="mt-1 leading-tight"><p class="text-[9px] sm:text-[10px] text-orange-500 font-bold">Đang phục vụ</p><p class="text-[9px] sm:text-[10px] text-orange-600 font-bold truncate px-1">${invText}</p></div>`;
  }
  if (isReserved) return `<div class="mt-1 leading-tight"><p class="text-[9px] sm:text-[10px] text-blue-500 font-bold truncate px-1">Lúc ${reservation.time}</p><p class="text-[9px] sm:text-[10px] text-blue-600 font-bold truncate px-1">${reservation.customerName}</p></div>`;
  return `<span class="inline-block text-gray-500 text-[9px] sm:text-[10px] font-medium px-1.5 sm:px-2 py-0.5 rounded mt-1 group-hover:text-green-600 transition-colors">Trống sẵn sàng</span>`;
};

// --- QUẢN LÝ KHÁCH HÀNG ---
const isCustomerModalOpen = ref(false);
const customerSearchQuery = ref('');
const newCustomerName = ref('');
const newCustomerPhone = ref('');
const mockCustomers = ref([
  { id: 1, name: 'Anh Tú', phone: '0901234567' },
  { id: 2, name: 'Chị Mai', phone: '0987654321' }
]);

const filteredCustomers = computed(() => {
  if (!customerSearchQuery.value) return mockCustomers.value;
  const kw = customerSearchQuery.value.toLowerCase();
  return mockCustomers.value.filter(c => c.name.toLowerCase().includes(kw) || c.phone?.includes(kw));
});

const selectCustomer = (name) => {
  if (currentInvoice.value) currentInvoice.value.customerName = name;
  isCustomerModalOpen.value = false;
};

const quickAddCustomer = () => {
  if (!newCustomerName.value.trim()) return alert('Vui lòng nhập tên khách hàng!');
  mockCustomers.value.unshift({ id: Date.now(), name: newCustomerName.value, phone: newCustomerPhone.value });
  selectCustomer(newCustomerName.value);
  newCustomerName.value = ''; newCustomerPhone.value = '';
};

// --- THANH TOÁN ---
const isCheckoutModalOpen = ref(false);
const paymentMethod = ref('cash');

const openCheckoutModal = () => {
  if (!currentInvoice.value || currentInvoice.value.items.length === 0) return alert('Hóa đơn trống!');
  const hasPending = currentInvoice.value.items.some(c => c.status === 'sent' || c.status === 'new');
  if (hasPending && !confirm("Cảnh báo: Hóa đơn này vẫn còn món CHƯA LÊN hoặc CHƯA BÁO BẾP. Thanh toán ngay?")) return;
  
  paymentMethod.value = 'cash';
  isCheckoutModalOpen.value = true;
};

const confirmPayment = () => {
  alert(`Thanh toán thành công Hóa đơn ${currentInvoiceId.value}!`);
  isCheckoutModalOpen.value = false;
  invoices.value = invoices.value.filter(i => i.id !== currentInvoiceId.value);
  
  if (invoices.value.length === 0) createNewInvoice();
  else currentInvoiceId.value = invoices.value[invoices.value.length - 1].id;
  
  if (window.innerWidth < 1024) isMobileCartOpen.value = false;
};

// --- RESERVATIONS ---
const mockReservations = ref([
  { tableName: 'T1-04', time: '19:00', customerName: 'Anh Tú' },
  { tableName: 'VIP-1', time: '20:30', customerName: 'Chị Mai' }
]);

const checkInReservation = (res) => {
  mockReservations.value = mockReservations.value.filter(r => r.tableName !== res.tableName);
  
  const newInv = { id: generateInvoiceId(), tables: [res.tableName], customerName: res.customerName, items: [] };
  invoices.value.push(newInv);
  currentInvoiceId.value = newInv.id;
  
  activeTab.value = 'pos'; // Quay về tab gọi món
  nextTick(() => {
    const el = document.getElementById('invoiceTabs');
    if (el) el.scrollTo({ left: el.scrollWidth, behavior: 'smooth' });
  });
};

onMounted(() => {
  const updateClock = () => {
    const now = new Date();
    currentTime.value = now.toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' });
    currentDate.value = now.toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit', year: 'numeric' });
  };
  timeInterval = setInterval(updateClock, 1000);
  updateClock();

  // Thêm event lăn chuột ngang cho các thẻ div có class custom-scroll-x
  document.querySelectorAll('.custom-scroll-x').forEach(el => {
    el.addEventListener('wheel', (e) => {
      if (e.deltaY !== 0) { e.preventDefault(); el.scrollLeft += e.deltaY; }
    });
  });
});

onUnmounted(() => {
  if (timeInterval) clearInterval(timeInterval);
});
</script>

<style scoped>
/* Custom scrollbar */
::-webkit-scrollbar { width: 6px; height: 6px; }
::-webkit-scrollbar-track { background: transparent; }
::-webkit-scrollbar-thumb { background: #e5e7eb; border-radius: 10px; }
::-webkit-scrollbar-thumb:hover { background: #d1d5db; }
.hide-scrollbar::-webkit-scrollbar { display: none; }
.hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }

.item-card:active { transform: scale(0.97); transition: transform 0.1s; }

/* Hiệu ứng mượt cho giỏ hàng */
.cart-item-enter { animation: slideIn 0.2s ease-out forwards; }
@keyframes slideIn {
  from { opacity: 0; transform: translateX(20px); }
  to { opacity: 1; transform: translateX(0); }
}

/* Vue Fade Transition cho Modals */
.fade-enter-active, .fade-leave-active { transition: opacity 0.3s ease; }
.fade-enter-active > div, .fade-leave-active > div { transition: transform 0.3s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
.fade-enter-from > div, .fade-leave-to > div { transform: translateY(100%); }

@media (min-width: 640px) {
  .fade-enter-from > div, .fade-leave-to > div { transform: scale(0.95); }
}

#invoiceTabs { scroll-behavior: smooth; }
</style>