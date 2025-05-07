using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.IdentityModel.Tokens;
using System.Text;

namespace CIoTD.CrossCutting.DependencyApp
{
    public static class DIConfigurationJWT
    {
        public static IServiceCollection AddInfraStructure(this IServiceCollection service,
                                                           IConfiguration configuration)
        {
            // Configuração da Autenticação JWT
            var key = Encoding.ASCII.GetBytes(configuration.GetSection("JwtSettings:Secret").Value!);
            service.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
                .AddJwtBearer(options =>
                {
                    options.RequireHttpsMetadata = false;
                    options.SaveToken = true;
                    options.TokenValidationParameters = new TokenValidationParameters
                    {
                        ValidateIssuerSigningKey = true,
                        IssuerSigningKey = new SymmetricSecurityKey(key),
                        ValidateIssuer = false,
                        ValidateAudience = false
                    };
                });

            return service;
        }
    }
}