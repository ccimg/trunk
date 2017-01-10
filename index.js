
const Hapi = require('hapi');

const mocker = new Hapi.Server();
mocker.connection({ 
    host: 'localhost', 
    port: 4444 
});

const fourOFour = [{statusCode: 404, errorCode: "Page not found", message: "Try a different url"}];
/*let data = fourOFour;
let code = 404;*/
mocker.ext('onPreResponse', function(request, reply) {
    if ( request.response.isBoom) {
            console.log(request.response)
            return reply(fourOFour).code(404)
        
    }
    return reply.continue();
});

mocker.route(

    
    
    
    [{method: 'GET', path: '/', config: { handler: function (request, reply) {
        return reply (require(`./util/content.json`)).code(200);
    }}},
    
    ]
    
);//Select id, Member__c, Member__r.HerokuId__c from MemberSecurityPermission__c where Related3rdParty__c = '${id}'

mocker.start((err) => {
    if (err) {throw err; }  
    console.log('Mocker running at:', mocker.info.uri);
});