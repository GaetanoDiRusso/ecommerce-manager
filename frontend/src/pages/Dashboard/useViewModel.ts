import React, { useEffect, useState } from "react";
import { Order } from "src/domain/entities/Order";
import { orderRepository } from "src/di";
import { CustomError } from "src/utils";
import { OrderFilter } from "src/domain/interfaces/IOrderRepository";

const useViewModel = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loadingReport, setLoadingReport] = useState(true);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<CustomError | null>(null);
  const [filter, setFilter] = useState<OrderFilter>({})

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const orders = await orderRepository.getOrders(filter);
      setOrders(orders);
    } catch (error) {
      setError(error as CustomError);
    } finally {
        setLoading(false);
    }
  };

  const downloadReportHandler = async () => {
    try {
      setLoadingReport(true);
      const base64Pdf = await orderRepository.getOrdersReport(filter);
      console.log(base64Pdf)

      const newTab = window.open()!
  
      newTab.document.body.appendChild(newTab.document.createElement('iframe')).src = base64Pdf;
      newTab.document.body.style.margin = "0";
      newTab.document.getElementsByTagName("iframe")[0].style.width = '100%';
      newTab.document.getElementsByTagName("iframe")[0].style.height = '100%';
      newTab.document.getElementsByTagName("iframe")[0].style.border = "0";

      setOrders(orders);
    } catch (error) {
      setError(error as CustomError);
    } finally {
        setLoadingReport(false);
    }
  }

  const changeStatusFilterHandler = (newStatus: OrderFilter["status"] | null) => {
    setFilter(prev => ({...prev, status: newStatus ?? undefined}))
  }

  const changeShippingPromiseDateFrom = (newDate: Date | null) => {
    setFilter(prev => ({...prev, shippingPromiseDateFrom: newDate ?? undefined}))
  }

  const changeShippingPromiseDateTo = (newDate: Date | null) => {
    let date: Date | undefined = undefined
    if(newDate) {
      date = new Date(newDate.getTime() + 24*60*60*1000 - 1)
    }

    setFilter(prev => ({...prev, shippingPromiseDateTo: date}))
  }

  const changeCreateDateFrom = (newDate: Date | null) => {
    setFilter(prev => ({...prev, createDateFrom: newDate ?? undefined}))
  }

  const changeCreateDateTo = (newDate: Date | null) => {
    let date: Date | undefined = undefined
    if(newDate) {
      date = new Date(newDate.getTime() + 24*60*60*1000 - 1)
    }
    setFilter(prev => ({...prev, createDateTo: date}))
  }

  const clearFilterHandler = () => {
    setFilter({})
  }

  useEffect(() => {
    fetchOrders();
  }, []);

  return {
    data: {
      orders,
    },
    filter,
    onChangeStatusFilter: changeStatusFilterHandler,
    onChangeShippingPromiseDateFrom: changeShippingPromiseDateFrom,
    onChangeShippingPromiseDateTo: changeShippingPromiseDateTo,
    onChangeCreateDateFrom: changeCreateDateFrom,
    onChangeCreateDateTo: changeCreateDateTo,
    onClearFilter: clearFilterHandler,
    onGenerateReport: downloadReportHandler,
    onSearchOrders: fetchOrders,
    loading,
    error,
  };
};

export default useViewModel;
