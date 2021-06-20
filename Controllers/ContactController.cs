using eCv.ConfigurationModels;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Options;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Text;
using System.Text.Json;
using System.Threading;
using System.Threading.Tasks;

namespace eCv.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ContactController : ControllerBase
    {
        private readonly IHttpClientFactory _clientFactory;
        private readonly string _slackHook;

        public ContactController(
            IHttpClientFactory clientFactory,
            IConfiguration config)
        {
            _clientFactory = clientFactory;
            _slackHook = config.GetValue<string>("MessagesSlackHook");
        }

        [HttpPost("message")]
        public async Task SendMessage(MessageData message)
        {
            var httpContent = new StringContent(JsonSerializer.Serialize(new { text = $"{message.Email}\n{message.Name}: {message.Message}" }), Encoding.UTF8, "application/json");
            var client = _clientFactory.CreateClient();
            var result = await client.PostAsync(_slackHook, httpContent);
            var statusCode = result.StatusCode;
            if (statusCode != System.Net.HttpStatusCode.OK)
            {
                // todo: log failure
            }
        }


        public class MessageData 
        {
            public string Name { get; set; }
            public string Email { get; set; }
            public string Message { get; set; }
        }
    }
}

