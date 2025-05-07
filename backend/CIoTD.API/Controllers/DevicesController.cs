using CIoTD.API.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace MinhaApiComJwt.Controllers
{
    [Authorize] // Exige autenticação para acessar este controller
    [ApiController]
    [Route("api/[controller]")]
    public class DevicesController : ControllerBase
    {
        private readonly HttpClient _httpClient;
        private readonly IConfiguration _configuration;

        public DevicesController(HttpClient httpClient, IConfiguration configuration)
        {
            _httpClient = httpClient;
            _configuration = configuration;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Device>>> GetDevices()
        {
            try
            {
                var response = await _httpClient.GetAsync(_configuration["JsonServerSettings:BaseUrl"] + "/device");
                response.EnsureSuccessStatusCode();
                var devices = await response.Content.ReadFromJsonAsync<IEnumerable<Device>>();
                return Ok(devices);
            }
            catch (HttpRequestException ex)
            {
                // Logar o erro
                return StatusCode(500, $"Erro ao comunicar com a json-server: {ex.Message}");
            }
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Device>> GetDevice(string id)
        {
            try
            {
                var response = await _httpClient.GetAsync(_configuration["JsonServerSettings:BaseUrl"] + $"/device/{id}");
                if (response.IsSuccessStatusCode)
                {
                    var device = await response.Content.ReadFromJsonAsync<Device>();
                    return Ok(device);
                }
                else if (response.StatusCode == System.Net.HttpStatusCode.NotFound)
                {
                    return NotFound();
                }
                else
                {
                    return StatusCode((int)response.StatusCode, "Erro ao obter dispositivo da json-server.");
                }
            }
            catch (HttpRequestException ex)
            {
                // Logar o erro
                return StatusCode(500, $"Erro ao comunicar com a json-server: {ex.Message}");
            }
        }

        [HttpPost]
        public IActionResult ExecuteTelnet([FromBody] ComunicationTelnetDto Dto)
        {
            
            return Ok(new TokenDto { Token = Dto.stringMontada });
        }
    }
}