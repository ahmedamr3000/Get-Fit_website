import { Injectable, signal } from '@angular/core';

export interface UserItem {
  id: string;
  name: string;
  email: string;
  avatar: string;
  phone?: string;
  country: string;
  subscription: {
    status: 'active' | 'expired' | 'free';
    plan: string;
    planName: string;
    expiresAt: string | null;
    gateway?: 'kashier';
    orderId?: string;
  };
  referralCode: string;
  referredBy?: string | null;
  consecutiveActiveDays: number;
  lastActiveDate: string;
  earned50PercentGoldDiscount: boolean;
  createdAt: string;
  isBanned: boolean;
}

export interface SubscriptionItem {
  id: string;
  orderId: string;
  userName: string;
  userEmail: string;
  userAvatar: string;
  planKey: string;
  planName: string;
  tier: 'Gold VIP' | 'Silver' | 'Standard';
  amountEgp: number;
  amountUsd: number;
  gateway: 'Kashier';
  status: 'active' | 'expired' | 'refunded';
  startDate: string;
  expiresAt: string;
  paymentMethod: string;
}

export interface PreRegisterItem {
  id: string;
  email: string;
  referenceId: string;
  createdAt: string;
  source: string;
  notified: boolean;
}

export interface DiscountCodeItem {
  id: string;
  code: string;
  discountPercent: 10 | 15 | 20 | 30 | 50;
  maxUses: number;
  usedCount: number;
  expiresAt: string;
  isActive: boolean;
  createdAt: string;
  createdByName: string;
}

export interface ReferrerLeaderboardItem {
  userId: string;
  name: string;
  email: string;
  avatar: string;
  referralCode: string;
  totalReferred: number;
  unlocked50Percent: boolean;
  totalEarningsDiscount: number;
}

@Injectable({
  providedIn: 'root',
})
export class AdminDataService {
  private readonly DISCOUNT_STORAGE_KEY = 'getfit_admin_discounts';

  // State Signals
  readonly users = signal<UserItem[]>([
    {
      id: 'usr_001',
      name: 'Ahmed Amr',
      email: 'ahmed.amr@gmail.com',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
      phone: '+20 100 123 4567',
      country: 'Egypt 🇪🇬',
      subscription: {
        status: 'active',
        plan: 'gold_annual',
        planName: 'Gold VIP 1 Year',
        expiresAt: '2027-02-15',
        gateway: 'kashier',
        orderId: 'KASH-948102',
      },
      referralCode: 'GF-AHMED1',
      referredBy: null,
      consecutiveActiveDays: 45,
      lastActiveDate: '2026-08-15',
      earned50PercentGoldDiscount: true,
      createdAt: '2026-01-01',
      isBanned: false,
    },
    {
      id: 'usr_002',
      name: 'Omar Khaled',
      email: 'omar.khaled@outlook.com',
      avatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=150&auto=format&fit=crop&q=80',
      phone: '+20 111 987 6543',
      country: 'Egypt 🇪🇬',
      subscription: {
        status: 'active',
        plan: 'gold_6months',
        planName: 'Gold VIP 6 Months',
        expiresAt: '2026-11-20',
        gateway: 'kashier',
        orderId: 'KASH-882314',
      },
      referralCode: 'GF-OMAR99',
      referredBy: 'GF-AHMED1',
      consecutiveActiveDays: 28,
      lastActiveDate: '2026-08-15',
      earned50PercentGoldDiscount: true,
      createdAt: '2026-02-10',
      isBanned: false,
    },
    {
      id: 'usr_003',
      name: 'Sarah Mohamed',
      email: 'sarah.m@yahoo.com',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
      phone: '+20 122 456 7890',
      country: 'Egypt 🇪🇬',
      subscription: {
        status: 'active',
        plan: 'silver_annual',
        planName: 'Silver 1 Year',
        expiresAt: '2027-01-15',
        gateway: 'kashier',
        orderId: 'KASH-773912',
      },
      referralCode: 'GF-SARAH7',
      referredBy: 'GF-AHMED1',
      consecutiveActiveDays: 19,
      lastActiveDate: '2026-08-14',
      earned50PercentGoldDiscount: false,
      createdAt: '2026-03-05',
      isBanned: false,
    },
    {
      id: 'usr_004',
      name: 'Marcus Vance',
      email: 'marcus.vance@techcorp.io',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
      phone: '+1 415 555 0192',
      country: 'USA 🇺🇸',
      subscription: {
        status: 'active',
        plan: '12_months',
        planName: 'Gold Annual Global',
        expiresAt: '2027-04-10',
        gateway: 'kashier',
        orderId: 'KASH-84920',
      },
      referralCode: 'GF-MARCUS',
      referredBy: null,
      consecutiveActiveDays: 34,
      lastActiveDate: '2026-08-15',
      earned50PercentGoldDiscount: false,
      createdAt: '2026-04-10',
      isBanned: false,
    },
    {
      id: 'usr_005',
      name: 'Youssef Hassan',
      email: 'youssef.h@gmail.com',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
      phone: '+20 102 333 4455',
      country: 'Egypt 🇪🇬',
      subscription: {
        status: 'expired',
        plan: 'gold_monthly',
        planName: 'Gold Monthly',
        expiresAt: '2026-07-28',
        gateway: 'kashier',
        orderId: 'KASH-662910',
      },
      referralCode: 'GF-YOUSSEF',
      referredBy: 'GF-OMAR99',
      consecutiveActiveDays: 3,
      lastActiveDate: '2026-08-01',
      earned50PercentGoldDiscount: false,
      createdAt: '2026-05-12',
      isBanned: false,
    },
    {
      id: 'usr_006',
      name: 'Layla Nour',
      email: 'layla.nour@gmail.com',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
      phone: '+20 115 889 0011',
      country: 'Egypt 🇪🇬',
      subscription: {
        status: 'active',
        plan: 'gold_3months',
        planName: 'Gold VIP 3 Months',
        expiresAt: '2026-09-30',
        gateway: 'kashier',
        orderId: 'KASH-993012',
      },
      referralCode: 'GF-LAYLA',
      referredBy: 'GF-AHMED1',
      consecutiveActiveDays: 14,
      lastActiveDate: '2026-08-15',
      earned50PercentGoldDiscount: false,
      createdAt: '2026-06-01',
      isBanned: false,
    },
    {
      id: 'usr_007',
      name: 'Tarek Ibrahim',
      email: 'tarek.ibrahim@yahoo.com',
      avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150&auto=format&fit=crop&q=80',
      phone: '+20 109 222 3344',
      country: 'Egypt 🇪🇬',
      subscription: {
        status: 'free',
        plan: 'none',
        planName: 'Free Tier',
        expiresAt: null,
      },
      referralCode: 'GF-TAREK',
      referredBy: 'GF-OMAR99',
      consecutiveActiveDays: 5,
      lastActiveDate: '2026-08-13',
      earned50PercentGoldDiscount: false,
      createdAt: '2026-07-15',
      isBanned: false,
    },
    {
      id: 'usr_008',
      name: 'Elena Rostova',
      email: 'elena.rostova@cloudmail.eu',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80',
      phone: '+44 7700 900077',
      country: 'UK 🇬🇧',
      subscription: {
        status: 'active',
        plan: '6_months',
        planName: 'Gold 6 Months Global',
        expiresAt: '2026-12-15',
        gateway: 'kashier',
        orderId: 'KASH-99104',
      },
      referralCode: 'GF-ELENA',
      referredBy: null,
      consecutiveActiveDays: 22,
      lastActiveDate: '2026-08-15',
      earned50PercentGoldDiscount: false,
      createdAt: '2026-06-15',
      isBanned: false,
    },
    {
      id: 'usr_009',
      name: 'Kareem Mostafa',
      email: 'kareem.mostafa@gmail.com',
      avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&auto=format&fit=crop&q=80',
      phone: '+20 101 777 8899',
      country: 'Egypt 🇪🇬',
      subscription: {
        status: 'active',
        plan: 'silver_monthly',
        planName: 'Silver Monthly',
        expiresAt: '2026-09-08',
        gateway: 'kashier',
        orderId: 'KASH-445892',
      },
      referralCode: 'GF-KAREEM',
      referredBy: 'GF-AHMED1',
      consecutiveActiveDays: 11,
      lastActiveDate: '2026-08-14',
      earned50PercentGoldDiscount: false,
      createdAt: '2026-08-08',
      isBanned: false,
    },
    {
      id: 'usr_010',
      name: 'Nourhan Adel',
      email: 'nourhan.adel@hotmail.com',
      avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80',
      phone: '+20 120 444 5566',
      country: 'Egypt 🇪🇬',
      subscription: {
        status: 'free',
        plan: 'none',
        planName: 'Free Tier',
        expiresAt: null,
      },
      referralCode: 'GF-NOURHAN',
      referredBy: null,
      consecutiveActiveDays: 1,
      lastActiveDate: '2026-08-12',
      earned50PercentGoldDiscount: false,
      createdAt: '2026-08-12',
      isBanned: false,
    },
  ]);

  readonly subscriptions = signal<SubscriptionItem[]>([
    {
      id: 'sub_001',
      orderId: 'PM-948102',
      userName: 'Ahmed Amr',
      userEmail: 'ahmed.amr@gmail.com',
      userAvatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
      planKey: 'gold_annual',
      planName: 'Gold VIP - 1 Year Pass',
      tier: 'Gold VIP',
      amountEgp: 3600,
      amountUsd: 72,
      gateway: 'Kashier',
      status: 'active',
      startDate: '2026-02-15',
      expiresAt: '2027-02-15',
      paymentMethod: 'Credit Card (Visa)',
    },
    {
      id: 'sub_002',
      orderId: 'PM-882314',
      userName: 'Omar Khaled',
      userEmail: 'omar.khaled@outlook.com',
      userAvatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=150&auto=format&fit=crop&q=80',
      planKey: 'gold_6months',
      planName: 'Gold VIP - 6 Months',
      tier: 'Gold VIP',
      amountEgp: 2250,
      amountUsd: 45,
      gateway: 'Kashier',
      status: 'active',
      startDate: '2026-05-20',
      expiresAt: '2026-11-20',
      paymentMethod: 'Credit Card (Visa)',
    },
    {
      id: 'sub_003',
      orderId: 'PM-773912',
      userName: 'Sarah Mohamed',
      userEmail: 'sarah.m@yahoo.com',
      userAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
      planKey: 'silver_annual',
      planName: 'Silver Tier - 1 Year',
      tier: 'Silver',
      amountEgp: 2880,
      amountUsd: 58,
      gateway: 'Kashier',
      status: 'active',
      startDate: '2026-01-15',
      expiresAt: '2027-01-15',
      paymentMethod: 'Mastercard',
    },
    {
      id: 'sub_004',
      orderId: 'LS-84920',
      userName: 'Marcus Vance',
      userEmail: 'marcus.vance@techcorp.io',
      userAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
      planKey: '12_months',
      planName: 'Gold VIP Annual Global',
      tier: 'Gold VIP',
      amountEgp: 3950,
      amountUsd: 80,
      gateway: 'Kashier',
      status: 'active',
      startDate: '2026-04-10',
      expiresAt: '2027-04-10',
      paymentMethod: 'Credit Card (Visa)',
    },
    {
      id: 'sub_005',
      orderId: 'PM-993012',
      userName: 'Layla Nour',
      userEmail: 'layla.nour@gmail.com',
      userAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
      planKey: 'gold_3months',
      planName: 'Gold VIP - 3 Months',
      tier: 'Gold VIP',
      amountEgp: 1275,
      amountUsd: 25,
      gateway: 'Kashier',
      status: 'active',
      startDate: '2026-06-30',
      expiresAt: '2026-09-30',
      paymentMethod: 'Credit Card (Mastercard)',
    },
    {
      id: 'sub_006',
      orderId: 'LS-99104',
      userName: 'Elena Rostova',
      userEmail: 'elena.rostova@cloudmail.eu',
      userAvatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80',
      planKey: '6_months',
      planName: 'Gold Tier - 6 Months',
      tier: 'Gold VIP',
      amountEgp: 2200,
      amountUsd: 45,
      gateway: 'Kashier',
      status: 'active',
      startDate: '2026-06-15',
      expiresAt: '2026-12-15',
      paymentMethod: 'Credit Card',
    },
    {
      id: 'sub_007',
      orderId: 'PM-445892',
      userName: 'Kareem Mostafa',
      userEmail: 'kareem.mostafa@gmail.com',
      userAvatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&auto=format&fit=crop&q=80',
      planKey: 'silver_monthly',
      planName: 'Silver Tier - Monthly',
      tier: 'Silver',
      amountEgp: 400,
      amountUsd: 8,
      gateway: 'Kashier',
      status: 'active',
      startDate: '2026-08-08',
      expiresAt: '2026-09-08',
      paymentMethod: 'Credit Card (Meeza)',
    },
    {
      id: 'sub_008',
      orderId: 'PM-662910',
      userName: 'Youssef Hassan',
      userEmail: 'youssef.h@gmail.com',
      userAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
      planKey: 'gold_monthly',
      planName: 'Gold VIP - Monthly',
      tier: 'Gold VIP',
      amountEgp: 500,
      amountUsd: 10,
      gateway: 'Kashier',
      status: 'expired',
      startDate: '2026-06-28',
      expiresAt: '2026-07-28',
      paymentMethod: 'Credit Card',
    },
  ]);

  readonly preRegisters = signal<PreRegisterItem[]>([
    {
      id: 'pr_001',
      email: 'karim.tarek@gmail.com',
      referenceId: 'REF-GF-2026-891234',
      createdAt: '2026-08-15 11:42',
      source: 'Landing Page Early Access Banner',
      notified: true,
    },
    {
      id: 'pr_002',
      email: 'fatma.elzahraa@yahoo.com',
      referenceId: 'REF-GF-2026-554109',
      createdAt: '2026-08-15 09:15',
      source: 'Hero CTA Pre-Register',
      notified: true,
    },
    {
      id: 'pr_003',
      email: 'hassan.elshamy@outlook.com',
      referenceId: 'REF-GF-2026-119842',
      createdAt: '2026-08-14 22:30',
      source: 'Pricing Section Early Access',
      notified: true,
    },
    {
      id: 'pr_004',
      email: 'mona.zaki.fitness@gmail.com',
      referenceId: 'REF-GF-2026-782390',
      createdAt: '2026-08-14 18:05',
      source: 'Landing Page Early Access Banner',
      notified: true,
    },
    {
      id: 'pr_005',
      email: 'alex.morgan.fit@gmail.com',
      referenceId: 'REF-GF-2026-339014',
      createdAt: '2026-08-14 14:20',
      source: 'Hero CTA Pre-Register',
      notified: true,
    },
    {
      id: 'pr_006',
      email: 'samir.lotfy@gmail.com',
      referenceId: 'REF-GF-2026-904128',
      createdAt: '2026-08-13 16:55',
      source: 'Landing Page Early Access Banner',
      notified: true,
    },
    {
      id: 'pr_007',
      email: 'mariam.sherif@hotmail.com',
      referenceId: 'REF-GF-2026-442190',
      createdAt: '2026-08-13 12:10',
      source: 'Features Showcase Pre-Register',
      notified: true,
    },
    {
      id: 'pr_008',
      email: 'david.beckett@london.co.uk',
      referenceId: 'REF-GF-2026-663812',
      createdAt: '2026-08-12 20:45',
      source: 'Pricing Section Early Access',
      notified: true,
    },
  ]);

  readonly discountCodes = signal<DiscountCodeItem[]>([]);

  constructor() {
    this.loadDiscountCodes();
  }

  private loadDiscountCodes(): void {
    const saved = localStorage.getItem(this.DISCOUNT_STORAGE_KEY);
    if (saved) {
      try {
        this.discountCodes.set(JSON.parse(saved));
        return;
      } catch {
        // fallback to default
      }
    }

    const defaultCodes: DiscountCodeItem[] = [
      {
        id: 'dc_001',
        code: 'GETFIT50',
        discountPercent: 50,
        maxUses: 100,
        usedCount: 68,
        expiresAt: '2026-12-31',
        isActive: true,
        createdAt: '2026-06-01',
        createdByName: 'Ahmed Amr',
      },
      {
        id: 'dc_002',
        code: 'SUMMER30',
        discountPercent: 30,
        maxUses: 250,
        usedCount: 142,
        expiresAt: '2026-09-30',
        isActive: true,
        createdAt: '2026-07-01',
        createdByName: 'Ahmed Amr',
      },
      {
        id: 'dc_003',
        code: 'VIPGOLD20',
        discountPercent: 20,
        maxUses: 500,
        usedCount: 389,
        expiresAt: '2026-10-31',
        isActive: true,
        createdAt: '2026-05-15',
        createdByName: 'Ahmed Amr',
      },
      {
        id: 'dc_004',
        code: 'WELCOME15',
        discountPercent: 15,
        maxUses: 1000,
        usedCount: 450,
        expiresAt: '2027-01-01',
        isActive: true,
        createdAt: '2026-04-01',
        createdByName: 'Ahmed Amr',
      },
      {
        id: 'dc_005',
        code: 'LAUNCH10',
        discountPercent: 10,
        maxUses: 2000,
        usedCount: 812,
        expiresAt: '2026-12-31',
        isActive: true,
        createdAt: '2026-01-10',
        createdByName: 'Ahmed Amr',
      },
    ];

    this.discountCodes.set(defaultCodes);
    this.saveDiscountCodes();
  }

  private saveDiscountCodes(): void {
    localStorage.setItem(this.DISCOUNT_STORAGE_KEY, JSON.stringify(this.discountCodes()));
  }

  // Discount Codes Actions
  createDiscountCode(
    code: string,
    discountPercent: 10 | 15 | 20 | 30 | 50,
    maxUses: number,
    expiresAt: string,
    createdByName: string = 'Ahmed Amr'
  ): { success: boolean; message: string } {
    const cleanCode = code.trim().toUpperCase();
    if (!cleanCode) {
      return { success: false, message: 'Please enter a valid coupon code string.' };
    }

    const exists = this.discountCodes().some((c) => c.code === cleanCode);
    if (exists) {
      return { success: false, message: `Promo code "${cleanCode}" already exists.` };
    }

    const newCode: DiscountCodeItem = {
      id: 'dc_' + Math.random().toString(36).substring(2, 9),
      code: cleanCode,
      discountPercent,
      maxUses: maxUses || 100,
      usedCount: 0,
      expiresAt: expiresAt || '2026-12-31',
      isActive: true,
      createdAt: new Date().toISOString().split('T')[0],
      createdByName,
    };

    this.discountCodes.update((list) => [newCode, ...list]);
    this.saveDiscountCodes();
    return { success: true, message: `Promo code "${cleanCode}" (${discountPercent}%) created successfully!` };
  }

  toggleDiscountCode(id: string): void {
    this.discountCodes.update((list) =>
      list.map((c) => (c.id === id ? { ...c, isActive: !c.isActive } : c))
    );
    this.saveDiscountCodes();
  }

  deleteDiscountCode(id: string): void {
    this.discountCodes.update((list) => list.filter((c) => c.id !== id));
    this.saveDiscountCodes();
  }

  // User Actions
  toggleBanUser(userId: string): void {
    this.users.update((list) =>
      list.map((u) => (u.id === userId ? { ...u, isBanned: !u.isBanned } : u))
    );
  }

  // Pre-Register export
  exportPreRegistersCsv(): void {
    const data = this.preRegisters();
    let csv = 'ID,Email,Reference ID,Registration Date,Source\n';
    data.forEach((item) => {
      csv += `"${item.id}","${item.email}","${item.referenceId}","${item.createdAt}","${item.source}"\n`;
    });

    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `getfit_preregister_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  // Referrer Leaderboard
  getReferrerLeaderboard(): ReferrerLeaderboardItem[] {
    return [
      {
        userId: 'usr_001',
        name: 'Ahmed Amr',
        email: 'ahmed.amr@gmail.com',
        avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
        referralCode: 'GF-AHMED1',
        totalReferred: 14,
        unlocked50Percent: true,
        totalEarningsDiscount: 50,
      },
      {
        userId: 'usr_002',
        name: 'Omar Khaled',
        email: 'omar.khaled@outlook.com',
        avatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=150&auto=format&fit=crop&q=80',
        referralCode: 'GF-OMAR99',
        totalReferred: 8,
        unlocked50Percent: true,
        totalEarningsDiscount: 50,
      },
      {
        userId: 'usr_003',
        name: 'Sarah Mohamed',
        email: 'sarah.m@yahoo.com',
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
        referralCode: 'GF-SARAH7',
        totalReferred: 4,
        unlocked50Percent: false,
        totalEarningsDiscount: 20,
      },
      {
        userId: 'usr_006',
        name: 'Layla Nour',
        email: 'layla.nour@gmail.com',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
        referralCode: 'GF-LAYLA',
        totalReferred: 3,
        unlocked50Percent: false,
        totalEarningsDiscount: 20,
      },
      {
        userId: 'usr_005',
        name: 'Youssef Hassan',
        email: 'youssef.h@gmail.com',
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
        referralCode: 'GF-YOUSSEF',
        totalReferred: 1,
        unlocked50Percent: false,
        totalEarningsDiscount: 20,
      },
    ];
  }
}
