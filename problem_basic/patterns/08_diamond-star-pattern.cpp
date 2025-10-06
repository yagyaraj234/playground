#include<iostream>

using namespace std;


void PrintDiamondStarPattern(){
    int n=5;
    for(int i=0;i<n*2;i++){
       if(i<5){
         // Print Spaces
        for(int j=0;j<n-i;j++){
            cout<<" ";
        }
        // Print Star
        for(int k=0;k<2*i+1;k++){
            cout<<"*";
        }
       }else{

        // Print Spaces

        for(int j =0;j<i-n+1;j++){
            cout<<" ";
        }
        // Print Star

        for(int k=0;k<2*(2*n-i)-1;k++){
            cout<<"*";
        }
       }
        cout<<endl;
    }
}


int main(){

    PrintDiamondStarPattern();


    return 0;
}