using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;

namespace eCv.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LoggingController : ControllerBase
    {
        private readonly IHttpClientFactory _clientFactory;
        private readonly string _slackHook;

        public LoggingController(
            IHttpClientFactory clientFactory,
            IConfiguration config)
        {
            _clientFactory = clientFactory;
            _slackHook = config.GetValue<string>("LogsSlackHook");
        }

        [HttpPost("log")]
        public async Task Log(LogError error)
        {
            var httpContent = new StringContent(JsonSerializer.Serialize(new { 
                text = $"Url: {error.Url}\n{error.Name}: {error.Message}\n{error.CallStack}\n{error.ComponentCallStack}" }), 
                Encoding.UTF8, "application/json");
            var client = _clientFactory.CreateClient();
            var result = await client.PostAsync(_slackHook, httpContent);
            var statusCode = result.StatusCode;
            if (statusCode != System.Net.HttpStatusCode.OK)
            {
                // todo: log failure
            }
        }

        public class LogError
        {
            public string Name { get; set; }
            public string Message { get; set; }
            public string CallStack { get; set; }
            public string ComponentCallStack { get; set; }
            public string Url { get; set; }
        }
    }
}
