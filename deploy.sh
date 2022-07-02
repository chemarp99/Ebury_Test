alias dxcreate='sfdx force:org:create -d 30 -f config/project-scratch-def.json --setdefaultusername -a '
alias dxpush='sfdx force:source:push -u '
alias dxpull='sfdx force:source:pull -u '
alias dxlist='sfdx force:org:list'
alias dxdelete='sfdx force:org:delete -u '
alias dxopen='sfdx force:org:open -u '

alias dxconnect='sfdx force:auth:web:login -a '
alias dxconnectSB='sfdx force:auth:web:login -r https://test.salesforce.com -a '


dxStart () {
   sfcreate $1
   sfpush $1
   sfopen $1
}

dxRun () {
   read -n 1 -p "Please Confirm (y/n)? " answer
      case ${answer:0:1} in
      y|Y )
            echo  \ 
            local msg="I will "
            echo $msg Create Org
                   sfcreate $1
            echo $msg Push Code
                  sfpush $1
            echo $msg Open the org
                  sfopen $1
      ;;
      * )
         echo  \ 
         echo Going out     
   ;;
   esac
}