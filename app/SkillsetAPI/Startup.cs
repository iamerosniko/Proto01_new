using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Newtonsoft.Json.Serialization;
using SkillsetAPI.Entities;
using SkillsetAPI.Services;
using System;

namespace SkillsetAPI
{
  public class Startup
  {
    public Startup(IConfiguration configuration)
    {
      Configuration = configuration;
    }

    public static IConfiguration Configuration { get; private set; }

    // This method gets called by the runtime. Use this method to add services to the container.
    public void ConfigureServices(IServiceCollection services)
    {

      var a = Startup.Configuration["JWT:ValidIssuer"];
      //services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
      //.AddJwtBearer(options =>
      //{
      //  options.TokenValidationParameters = new TokenValidationParameters
      //  {
      //    ValidateIssuer = true,
      //    ValidateAudience = true,
      //    ValidateLifetime = true,
      //    ValidateIssuerSigningKey = true,
      //    ValidIssuer = Startup.Configuration["JWT:ValidIssuer"],
      //    ValidAudience = Startup.Configuration["JWT:ValidAudience"],
      //    IssuerSigningKey = new SymmetricSecurityKey(
      //                    Encoding.UTF8.GetBytes(Startup.Configuration["JWT:IssuerSigningKey"])),
      //  };
      //});

      //this will make JSON as statement case
      services.AddMvc()
      .AddJsonOptions(o =>
      {
        if (o.SerializerSettings.ContractResolver != null)
        {
          var castedResolver = o.SerializerSettings.ContractResolver
                        as DefaultContractResolver;
          castedResolver.NamingStrategy = null;
        }
      });

      //Use for migration only, then comment all statement in DB context constructor
      //var connectionString = @"Server=(localdb)\MSSQLLocalDB;Database=dbbtSSetp1;Trusted_Connection=True";
      //Use below in Production
      var connectionString = Startup.Configuration["ConnectionStrings:dbbtSSetp1ConnectionString"];

      services.AddDbContext<SkillSetContext>(o => o.UseSqlServer(connectionString));
      //comment this out when creating new migration
      services.AddScoped<ISkillSetRepository, SkillSetRepository>();
      services.AddCors();
    }

    // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
    public void Configure(IApplicationBuilder app, IHostingEnvironment env, SkillSetContext skillSetContext)
    {
      if (env.IsDevelopment())
      {
        app.UseDeveloperExceptionPage();
      }
      app.UseCors(builder =>
      {
        builder.AllowAnyHeader();
        builder.AllowAnyOrigin();
      }

      );
      //this is used for autherization
      //app.UseAuthentication();

      //This is for Seeding comment this when ading migration, comment this out when creating new migration
      // skillSetContext.EnsureSeedDataForContext();

      AutoMapper.Mapper.Initialize(
              cfg =>
              {
                cfg.CreateMap<Models.AssociateForCreateDTO, Entities.Associate>()
                        .ForMember(dest => dest.UpdatedOn, opt => opt.MapFrom(o => DateTime.Now))
                        .ForMember(dest => dest.IsActive, opt => opt.MapFrom(o => true));
                cfg.CreateMap<Models.AssociateForUpdateDTO, Entities.Associate>()
                              .ForMember(dest => dest.UpdatedOn, opt => opt.MapFrom(o => DateTime.Now));
                cfg.CreateMap<Models.DepartmentForCreateDTO, Entities.Department>()
                              .ForMember(dest => dest.IsActive, opt => opt.MapFrom(o => true));
                cfg.CreateMap<Models.DepartmentForUpdateDTO, Entities.Department>();
                cfg.CreateMap<Models.LocationForCreateDTO, Entities.Location>()
                              .ForMember(dest => dest.IsActive, opt => opt.MapFrom(o => true));
                cfg.CreateMap<Models.LocationForUpdateDTO, Entities.Location>();
                cfg.CreateMap<Models.SkillsetForCreateDTO, Entities.Skillset>()
                              .ForMember(dest => dest.IsActive, opt => opt.MapFrom(o => true));
                cfg.CreateMap<Models.SkillsetForUpdateDTO, Entities.Skillset>();
                cfg.CreateMap<Models.DepartmentSkillsetForCreateDTO, Entities.DepartmentSkillset>();
                cfg.CreateMap<Models.AssociateDepartmentSkillsetForCreateDTO, Entities.AssociateDepartmentSkillset>();
              });

      try
      {
        using (var serviceScope = app.ApplicationServices.GetRequiredService<IServiceScopeFactory>()
        .CreateScope())
        {
          serviceScope.ServiceProvider.GetService<SkillSetContext>().Database.Migrate();
        }
      }
      catch (Exception ex)
      {

        System.Diagnostics.Debug.WriteLine(ex, "Failed to migrate or seed database");
      }

      app.UseMvc();
    }
  }
}
