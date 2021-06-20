#See https://aka.ms/containerfastmode to understand how Visual Studio uses this Dockerfile to build your images for faster debugging.

FROM mcr.microsoft.com/dotnet/aspnet:5.0 AS base
WORKDIR /app
EXPOSE 8080
RUN apt-get update
RUN apt-get install -y curl
RUN curl -fsSL https://deb.nodesource.com/setup_16.x | bash -
RUN apt-get install -y nodejs

FROM mcr.microsoft.com/dotnet/sdk:5.0 AS build
RUN apt-get update
RUN curl -fsSL https://deb.nodesource.com/setup_16.x | bash -
RUN apt-get install -y nodejs
WORKDIR /src
COPY ["eCv.csproj", "."]
RUN dotnet restore "./eCv.csproj"
COPY . .
WORKDIR "/src/."
RUN dotnet build "eCv.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "eCv.csproj" -c Release -o /app/publish

FROM base AS final
WORKDIR /app
ARG DeploymentSlackHook
COPY --from=publish /app/publish .
RUN curl -X POST -H 'Content-type: application/json' --data '{"text":"Deployment finished"}' "${DeploymentSlackHook}"
ENTRYPOINT ["dotnet", "eCv.dll", "--urls=http://0.0.0.0:8080"]