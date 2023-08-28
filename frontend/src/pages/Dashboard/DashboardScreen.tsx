import React from "react";
import Navbar from "src/components/Navbar/Navbar";
import {
  Table,
  TableHead,
  TableHeader,
  TableRow,
} from "src/components/ui/table";
import useViewModel from "./useViewModel";
import OrderRow from "./components/OrderRow";
import StatusFilter from "./components/StatusFilter";
import { Button } from "src/components/ui/button";
import { DatePicker } from "./components/DatePicker";

const DashboardScreen = () => {
  const {
    data,
    filter,
    onChangeStatusFilter,
    onChangeShippingPromiseDateFrom,
    onChangeShippingPromiseDateTo,
    onChangeCreateDateFrom,
    onChangeCreateDateTo,
    onClearFilter,
    onGenerateReport,
    onSearchOrders,
    loading,
    error,
  } = useViewModel();

  return (
    <div>
      <Navbar />

      <div className="flex flex-wrap w-full h-full">
        <div className="flex flex-col flex-1 p-6 gap-4">
          <h2 className="pb-5 font-bold text-3xl text-gray-500 text-center">
            Ordenes
          </h2>

          <div className="flex p-5 justify-between items-center border border-gray-300 p-2 rounded-xl">
            <div className="flex gap-x-14 gap-y-4 flex-wrap">
              <div className="flex gap-4">
                <p className="self-center font-bold">Estado:</p>
                <StatusFilter
                  status={filter.status ?? null}
                  onChange={onChangeStatusFilter}
                />
              </div>

              <div className="flex gap-4">
                <p className="self-center font-bold">Limite entrega desde:</p>
                <DatePicker date={filter.shippingPromiseDateFrom} onChangeDate={onChangeShippingPromiseDateFrom} />
              </div>

              <div className="flex gap-4">
                <p className="self-center font-bold">Limite entrega hasta:</p>
                <DatePicker date={filter.shippingPromiseDateTo} onChangeDate={onChangeShippingPromiseDateTo} />
              </div>

              <div className="flex gap-4">
                <p className="self-center font-bold">Fecha creacion desde:</p>
                <DatePicker date={filter.createDateFrom} onChangeDate={onChangeCreateDateFrom} />
              </div>

              <div className="flex gap-4">
                <p className="self-center font-bold">Fecha creacion hasta:</p>
                <DatePicker date={filter.createDateTo} onChangeDate={onChangeCreateDateTo} />
              </div>
            </div>

            <div className="flex flex-col gap-3">
              <div className="flex gap-3">
                <Button className="self-center" onClick={onSearchOrders}>
                  Buscar
                </Button>
                <Button variant="outline" className="self-center" onClick={onClearFilter}>
                  Limpiar
                </Button>
              </div>

              <Button className="self-center" onClick={onGenerateReport}>
                Generar reporte
              </Button>
            </div>

          </div>

          {error ? (
            <div>Error, intente mas tarde</div>
          ) : loading ? (
            <div>Loading...</div>
          ) : (
            <div className="border border-gray-300 p-2 rounded-xl">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Id</TableHead>
                    <TableHead>Fecha de creacion</TableHead>
                    <TableHead>Estado</TableHead>
                    <TableHead>Cliente</TableHead>
                    <TableHead>Direccion de envio</TableHead>
                    <TableHead>Fecha limite de entrega</TableHead>
                    <TableHead>Articulos</TableHead>
                  </TableRow>
                </TableHeader>

                {data!.orders.map((order) => (
                  <OrderRow key={order.id} order={order} />
                ))}
              </Table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DashboardScreen;
