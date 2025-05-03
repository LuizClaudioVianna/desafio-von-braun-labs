namespace CIoTD.API.Models
{
    public class Device
    {
        public string Id { get; set; }
        public string Identifier { get; set; }
        public string Description { get; set; }
        public string Manufacturer { get; set; }
        public string Url { get; set; }
        public List<object> Commands { get; set; }
        // Adicione outras propriedades conforme necessário
    }
}
