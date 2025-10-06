#include<iostream>
using namespace std;

void HalfDiamondStartPattern(){

    int n = 5;

    

    for(int i=0;i<n*2-1;i++){
        if(i<5){
            for(int j=0;j<i+1;j++){
            cout<<"*";
            }
        }else{
            for(int j=0;j<n*2-i-1;j++){
                cout<<"*";
            }
        }
        cout<<endl;
    }
}


int main(){
    HalfDiamondStartPattern();
    return 0;
}