import {DataResponse} from 'src/utils';
import {POrder} from '../domain/entities/presentation/POrder';
import {IOrderRepository, OrderStatusEnum} from '../domain';
import PdfPrinter from 'pdfmake';
import {TDocumentDefinitions} from 'pdfmake/interfaces';
import {createWriteStream} from 'fs';

// import * as pdfMake from 'pdfmake/build/pdfmake';
// import * as pdfFonts from 'pdfmake/build/vfs_fonts';

// (pdfMake as any).vfs = pdfFonts.pdfMake.vfs;

// const font = require("pdfmake/build/vfs_fonts.js").pdfMake.vfs;
// console.log({font})

export interface OrderFilter {
  status?: OrderStatusEnum;
  shippingPromiseDateFrom?: Date;
  shippingPromiseDateTo?: Date;
  createDateFrom?: Date;
  createDateTo?: Date;
}

export class GetOrdersPdfUseCase {
  constructor(private orderRepository: IOrderRepository) {}

  async execute(filter?: OrderFilter): DataResponse<string> {
    try {
      const orders = (await this.orderRepository.getPopulatedOrders(filter)) as POrder[];

      const printer = new PdfPrinter({
        Roboto: {
          normal: Buffer.from(require('pdfmake/build/vfs_fonts.js').pdfMake.vfs['Roboto-Regular.ttf'], 'base64'),
          bold: Buffer.from(require('pdfmake/build/vfs_fonts.js').pdfMake.vfs['Roboto-Medium.ttf'], 'base64'),
        },
      });
      const pdfDoc = printer.createPdfKitDocument(getOrdersPdfContent(orders));

      const pdfBase64: string = await new Promise((res, rej) => {
        let chunks: any[] = [];
        let result: Buffer;

        pdfDoc.on('data', (chunk) => {
          chunks.push(chunk);
        });

        pdfDoc.on('end', () => {
          result = Buffer.concat(chunks);
          res('data:application/pdf;base64,' + result.toString('base64'));
        });

        pdfDoc.end();
      });

      return pdfBase64;
    } catch (error) {
      console.log({error});
      throw error;
    }
  }
}

const getOrdersPdfContent = (orders: POrder[]) => {
  const dd: TDocumentDefinitions = {
    content: [
      {text: 'Orders', style: 'header', alignment: 'center'},

      {
        style: 'tableExample',
        table: {
          body: [
            [
              {text: 'Id', style: 'tableHeader', alignment: 'center'},
              {text: 'Fecha creacion', style: 'tableHeader', alignment: 'center'},
              {text: 'Estado', style: 'tableHeader', alignment: 'center'},
              {text: 'Cliente', style: 'tableHeader', alignment: 'center'},
              {text: 'Direccion envio', style: 'tableHeader', alignment: 'center'},
              {text: 'Fecha limite entrega', style: 'tableHeader', alignment: 'center'},
              {text: 'Articulos', style: 'tableHeader', alignment: 'center'},
            ],
            ...orders.map((o) => [
              o.id,
              o.createDate.toDateString(),
              o.status,
              `Nombre: ${o.client.firstName} ${o.client.lastName}\n
               Email: ${o.client.email}
              `,
              o.shippingAddress,
              o.shippingPromise.toDateString(),
              o.items
                .map(
                  (i, n) =>
                    `Articulo ${n + 1}:\nNombre: ${i.item.title}\nPrecio por unidad: ${i.item.price}\nCantidad: ${
                      i.quantity
                    }`
                )
                .join('\n'),
            ]),
          ],
        },
      },
    ],
    styles: {
      header: {
        fontSize: 18,
        bold: true,
        margin: [0, 0, 0, 10],
      },
      subheader: {
        fontSize: 16,
        bold: true,
        margin: [0, 10, 0, 5],
      },
      tableExample: {
        margin: [0, 5, 0, 15],
      },
      tableHeader: {
        bold: true,
        fontSize: 13,
        color: 'black',
      },
    },
    pageOrientation: 'landscape',
  };

  return dd;
};
