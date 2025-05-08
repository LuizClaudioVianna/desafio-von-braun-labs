using CIoTD.Infra.Context;
using Microsoft.EntityFrameworkCore;
using Microsoft.OpenApi.Models;
using CIoTD.CrossCutting.DependencyApp;



var builder = WebApplication.CreateBuilder(args);

// Registrar serviços
builder.Services.AddInfraStructure(builder.Configuration);

builder.Services.AddControllers();

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Configuração do Contexto do Banco de Dados em memória
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseInMemoryDatabase("InMemoryDb"));


builder.Services.AddSwaggerGen(c =>
 {
     c.SwaggerDoc("v1", new OpenApiInfo { Title = "API Devices", Version = "v1" });

     // Define o esquema de segurança "Bearer"
     c.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
     {
         Description = "Insira o Token JWT desta forma: {seu token}",
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
