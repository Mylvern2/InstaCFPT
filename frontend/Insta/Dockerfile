FROM nginx AS base
EXPOSE 80
EXPOSE 443

FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src
COPY ["Insta.csproj", "./"]
RUN dotnet restore "./Insta.csproj"

COPY . .
WORKDIR "/src/Insta"
RUN dotnet build "../Insta.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "../Insta.csproj" -c Release -o /app/publish /p:UseAppHost=false

FROM  base AS final
WORKDIR /usr/share/nginx/html
COPY --from=publish /app/publish/wwwroot .
COPY  ./nginx.conf /etc/nginx/nginx.conf