import { useState, useTransition } from 'react';
import * as XLSX from 'xlsx';
import { SiMicrosoftexcel } from 'react-icons/si';
import { Button, Tooltip, useToast } from '@chakra-ui/react';
import { apiBase } from '../../config/api-base';

// const PrivateLayout = dynamic(() => import("xlsx").then(module => module.utils));

interface IProps {
  fileName: string;
  columns: Array<{ field: string; title: string }>;
  csvData?: any;
  async?: boolean;
  serverPagination?: boolean;
  url?: string;
}
const ExportCSV: React.FC<IProps> = ({
  csvData,
  fileName,
  columns,
  async = false,
  url,
}) => {
  const toast = useToast();
  const [loading, setLoading] = useState(false);

  const [isPending, startTransition] = useTransition();

  const fileType =
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
  const fileExtension = '.xlsx';

  const renameColumn = (ws: any): void => {
    const range = XLSX.utils.decode_range(ws['!ref']);
    const titles = columns.map((column) => column.title);
    for (let C = range.s.r; C <= range.e.r; ++C) {
      const address = `${XLSX.utils.encode_col(C)}1`; // <-- first row, column number C

      if (ws[address] == null) continue;

      ws[address].v = titles[C].toUpperCase();
    }
  };

  const exportToCSV = (dataCsv: any, filename: string): void => {
    const ws = XLSX.utils.json_to_sheet(dataCsv);
    renameColumn(ws);
    const wb = { Sheets: { data: ws }, SheetNames: ['data'] };
    const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    const data = new Blob([excelBuffer], { type: fileType });

    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(data);
    link.download = filename.concat(fileExtension);

    document.body.appendChild(link);

    link.click();
  };

  const requestData = async (): Promise<void> => {
    if (async) {
      setLoading(true);

      try {
        const response = await apiBase.get(url ?? '');
        // const data = serverPagination ? response.data.items : response.data;
        const {
          data: { items },
        } = response;

        startTransition(() => {
          const fields = columns.map((column) => column.field);
          const dataFormated = items.map((d: any) => {
            const entries = fields.map((field) => [field, d[field]]);

            const newObject = Object.fromEntries(entries);

            return newObject;
          });
          exportToCSV(dataFormated, fileName);

          toast({
            title: 'Sucesso!',
            description: 'Arquivo baixado com sucesso!',
            status: 'success',
            duration: 15000,
            isClosable: true,
            position: 'top-right',
          });
        });
      } catch (error) {
        console.log(error);

        toast({
          title: 'Erro!',
          description: 'Ocorreu um erro ao baixar o arquivo!',
          status: 'error',
          duration: 15000,
          isClosable: true,
          position: 'top-right',
        });
      } finally {
        setLoading(false);
      }
    } else {
      startTransition(() => {
        exportToCSV(csvData, fileName);
      });
    }
  };

  return (
    <Tooltip hasArrow label="Baixar Planilha" placement="top" ml={2}>
      <Button
        colorScheme="green"
        // eslint-disable-next-line @typescript-eslint/no-misused-promises
        onClick={async () => {
          await requestData();
        }}
        isLoading={isPending || loading}
        size="md"
      >
        <SiMicrosoftexcel size={22} />
      </Button>
    </Tooltip>
  );
};

export default ExportCSV;
