#include<iostream>
using namespace std;

void invertedStarPyramid(){

    int n=5;

    for(int i=0;i<n;i++){

        // Print Spaces

        for(int j=0;j< i ;j++){
            cout<<" ";
        }
        // Print Star
        for(int k=0;k<2*(n-i)-1;k++){
            cout<<"*";
        }
        cout<<endl;
    }
}

int main(){

    invertedStarPyramid();
    return 0;

}