FROM node:20-bullseye

RUN    apt update && apt install -y --no-install-recommends \
    git \
    ca-certificates  ca-certificates-java \
    default-jre \
    zsh \
    curl \
    wget

ENV JAVA_HOME=" /usr/lib/jvm/java-17-openjdk-amd64/"

USER node

WORKDIR /home/node/app

RUN bash -c "$(curl --fail --show-error --silent --location https://raw.githubusercontent.com/zdharma-continuum/zinit/HEAD/scripts/install.sh)" -- \
    bash -c zinit self-update

RUN echo "zinit light zdharma/fast-syntax-highlighting" >>~/.zshrc && \
    echo "zinit light zsh-users/zsh-autosuggestions" >>~/.zshrc && \
    echo "zinit light zsh-users/zsh-completions" >>~/.zshrc && \
    echo "zinit ice depth=1; zinit light romkatv/powerlevel10k" >>~/.zshrc && \
    echo 'HISTFILE=~/zsh/.zsh_history\nHISTSIZE=10000' >>~/.zshrc && \
    echo "function save_history_after_command {\nhistory >> ~/zsh/.zsh_history\n}\nprecmd_functions+=(save_history_after_command)" >>~/.zshrc


CMD ["sh", "-c", "yarn && tail -f /dev/null" ]
