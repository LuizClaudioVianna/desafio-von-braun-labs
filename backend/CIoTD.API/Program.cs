using CIoTD.API.Data;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using System.Text;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Configuração do Contexto do Banco de Dados em memória
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseInMemoryDatabase("InMemoryDb"));

// Configuração da Autenticação JWT
var key = Encoding.ASCII.GetBytes(builder.Configuration.GetSection("JwtSettings:Secret").Value!);
builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
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

//Teste
builder.Services.AddSwaggerGen(c =>
 {
     c.SwaggerDoc("v1", new OpenApiInfo { Title = "Sua API de Dispositivos", Version = "v1" });

     // Define o esquema de segurança "Bearer"
     c.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
     {
         Description = "Insira o Token JWT desta forma: Bearer {seu token}",
         Name = "Authorization",
         In = ParameterLocation.Header,
         Type = SecuritySchemeType.Http,
         Scheme = "bearer",
         BearerFormat = "JWT"
     });

     // Aplica o requisito de segurança globalmente (para todos os endpoints que exigem autenticação)
     c.AddSecurityRequirement(new OpenApiSecurityRequirement
        {
            {
                new OpenApiSecurityScheme
                {
                    Reference = new OpenApiReference
                    {
                        Type = ReferenceType.SecurityScheme,
                        Id = "Bearer"
                    }
                },
                new string[] {}
            }
        });
 });
//Fim teste


// Adicionar serviço para fazer requisições HTTP
builder.Services.AddHttpClient();



var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors(opt => {
    opt.WithOrigins("http://localhost:4200");
    opt.AllowAnyMethod();
    opt.AllowAnyHeader();
});

app.UseHttpsRedirection();

// Adicionar middleware de autenticação ANTES da autorização
app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

// Criar o banco de dados na inicialização
using (var scope = app.Services.CreateScope())
{
    var dbContext = scope.ServiceProvider.GetRequiredService<AppDbContext>();
    dbContext.Database.EnsureCreated();
}

app.Run();
