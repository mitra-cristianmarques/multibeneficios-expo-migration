export default interface ApiResponseDto<T> {
  dados: ApiResponseBody<T>;
  tempoMetodo: ReponseDetails;
}

interface ApiResponseBody<T> {
  apiResultado: 'S' | 'E'; // S - Success, E - Error
  apiMensagemSuporte: string;
  apiMensagemUsuario: string;
  apiDados: T;
}

interface ReponseDetails {
  tempoInicioMetodo: number;
  tempoFimMetodo: number;
}
