import CategoryDto from './CategoryDto';

export default interface OutcomeTransactionHistoryDto {
  beneficiario: string;
  data: string;
  descricao: string;
  valor: number;
  tipo: string;
  categoria: CategoryDto;
}
