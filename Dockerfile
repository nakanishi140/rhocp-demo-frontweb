FROM image-registry.openshift-image-registry.svc:5000/demo/basenode:latest

RUN git clone -b v11 https://github.com/yuu-ymt/rhocp-demo-frontweb.git
RUN mv rhocp-demo-frontweb/* ./
RUN chgrp -R 0 /root/app &&  chmod -R g=u /root/app
USER 1001
EXPOSE 8080
ENTRYPOINT ["node","app.js"]
