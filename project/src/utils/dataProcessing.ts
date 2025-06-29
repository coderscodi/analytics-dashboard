import { SalesRecord } from '../data/mockData';
import { startOfDay, endOfDay, subDays, isWithinInterval } from 'date-fns';

export interface KPIData {
  totalRevenue: number;
  totalOrders: number;
  averageOrderValue: number;
  totalCustomers: number;
}

export interface FilterOptions {
  dateRange: 'last7days' | 'last30days' | 'custom';
  startDate?: string;
  endDate?: string;
  productCategory: string;
  region: string;
}

export function calculateKPIs(data: SalesRecord[]): KPIData {
  const totalRevenue = data.reduce((sum, record) => sum + (record.price * record.quantity), 0);
  const totalOrders = data.length;
  const averageOrderValue = totalOrders > 0 ? totalRevenue / totalOrders : 0;
  const uniqueCustomers = new Set(data.map(record => record.customer_id));
  
  return {
    totalRevenue,
    totalOrders,
    averageOrderValue,
    totalCustomers: uniqueCustomers.size
  };
}

export function filterData(data: SalesRecord[], filters: FilterOptions): SalesRecord[] {
  let filteredData = [...data];

  // Date filtering
  if (filters.dateRange === 'last7days') {
    const sevenDaysAgo = subDays(new Date(), 7);
    filteredData = filteredData.filter(record => {
      const recordDate = new Date(record.date);
      return isWithinInterval(recordDate, {
        start: startOfDay(sevenDaysAgo),
        end: endOfDay(new Date())
      });
    });
  } else if (filters.dateRange === 'last30days') {
    const thirtyDaysAgo = subDays(new Date(), 30);
    filteredData = filteredData.filter(record => {
      const recordDate = new Date(record.date);
      return isWithinInterval(recordDate, {
        start: startOfDay(thirtyDaysAgo),
        end: endOfDay(new Date())
      });
    });
  } else if (filters.dateRange === 'custom' && filters.startDate && filters.endDate) {
    filteredData = filteredData.filter(record => {
      const recordDate = new Date(record.date);
      return isWithinInterval(recordDate, {
        start: startOfDay(new Date(filters.startDate!)),
        end: endOfDay(new Date(filters.endDate!))
      });
    });
  }

  // Product category filtering
  if (filters.productCategory && filters.productCategory !== 'all') {
    filteredData = filteredData.filter(record => record.product_category === filters.productCategory);
  }

  // Region filtering
  if (filters.region && filters.region !== 'all') {
    filteredData = filteredData.filter(record => record.region === filters.region);
  }

  return filteredData;
}

export function groupDataByDate(data: SalesRecord[]) {
  const grouped = data.reduce((acc, record) => {
    const date = record.date;
    if (!acc[date]) {
      acc[date] = { date, revenue: 0, orders: 0 };
    }
    acc[date].revenue += record.price * record.quantity;
    acc[date].orders += 1;
    return acc;
  }, {} as Record<string, { date: string; revenue: number; orders: number }>);

  return Object.values(grouped).sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
}

export function groupDataByCategory(data: SalesRecord[]) {
  const grouped = data.reduce((acc, record) => {
    const category = record.product_category;
    if (!acc[category]) {
      acc[category] = { category, revenue: 0, orders: 0 };
    }
    acc[category].revenue += record.price * record.quantity;
    acc[category].orders += 1;
    return acc;
  }, {} as Record<string, { category: string; revenue: number; orders: number }>);

  return Object.values(grouped);
}

export function groupDataByRegion(data: SalesRecord[]) {
  const grouped = data.reduce((acc, record) => {
    const region = record.region;
    if (!acc[region]) {
      acc[region] = { region, revenue: 0, orders: 0 };
    }
    acc[region].revenue += record.price * record.quantity;
    acc[region].orders += 1;
    return acc;
  }, {} as Record<string, { region: string; revenue: number; orders: number }>);

  return Object.values(grouped);
}

export function exportToCSV(data: SalesRecord[], filename: string = 'sales-data.csv') {
  const headers = ['Order ID', 'Date', 'Product Category', 'Product Name', 'Price', 'Quantity', 'Region', 'Customer ID', 'Total'];
  const csvContent = [
    headers.join(','),
    ...data.map(record => [
      record.order_id,
      record.date,
      record.product_category,
      `"${record.product_name}"`,
      record.price,
      record.quantity,
      record.region,
      record.customer_id,
      (record.price * record.quantity).toFixed(2)
    ].join(','))
  ].join('\n');

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);
  link.setAttribute('href', url);
  link.setAttribute('download', filename);
  link.style.visibility = 'hidden';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}