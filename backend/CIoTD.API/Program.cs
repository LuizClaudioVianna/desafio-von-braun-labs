using CIoTD.Infra.Context;
using Microsoft.EntityFrameworkCore;
using Microsoft.OpenApi.Models;
using CIoTD.CrossCutting.DependencyApp;



var builder = WebApplication.CreateBuilder(args);

// Registrar servi�os
builder.Services.AddInfraStructure(builder.Configuration);

builder.Services.AddControllers();

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Configura��o do Contexto do Banco de Dados em mem�ria
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseInMemoryDatabase("InMemoryDb"));


builder.Services.AddSwaggerGen(c =>
 {
     c.SwaggerDoc("v1", new OpenApiInfo { Title = "API Devices", Version = "v1" });

     // Define o esquema de seguran�a "Bearer"
     c.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
     {
         Description = "Insira o Token JWT desta forma: {seu token}",
         Name = "Authorization",
         In = ParameterLocation.Header,
         Type = SecuritySchemeType.Http,
         Scheme = "bearer",
         BearerFormat = "JWT"
     });

     // Aplica o requisito de seguran�a globalmente (para todos os endpoints que exigem autentica��o)
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

// Adicionar servi�o para fazer requisi��es HTTP
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

// Adicionar middleware de autentica��o ANTES da autoriza��o
app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

// Criar o banco de dados na inicializa��o
using (var scope = app.Services.CreateScope())
{
    var dbContext = scope.ServiceProvider.GetRequiredService<AppDbContext>();
    dbContext.Database.EnsureCreated();
}

app.Run();
