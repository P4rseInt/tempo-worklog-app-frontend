export interface WorklogsModel {
  id: number;
  idIssue: number | string;
  descripcion: string;
  fechaInicio: string;
  fechaVencimiento: string;
  porcentajeCompletado: string;
  notas: string;
}
