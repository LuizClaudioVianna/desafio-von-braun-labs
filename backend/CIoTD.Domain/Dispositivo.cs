namespace CIoTD.Domain
{
    public abstract class Dispositivo
    {
        public string Identifier { get; set; }
        public string Fabricante { get; set; }
        public string Descricao { get; set; }
        public string NomeOperacao { get; set; }
        public string DescricaoOperacao { get; set; }
        public string DescricaoResultadoEsperado { get; set; }
        public string FormatoDadosRetornados { get; set; }
    }
}
